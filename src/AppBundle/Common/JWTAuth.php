<?php

namespace AppBundle\Common;

class JWTAuth
{
    const ALG = 'sha1';

    const TYP = 'JWT';

    protected $publicKey;

    protected $privateKey;

    protected $token;

    public function __construct($publicKey, $privateKey)
    {
        $this->publicKey = $publicKey;
        $this->privateKey = $privateKey;
        $this->token = md5($publicKey.$privateKey);
    }

    /**
     * @param $payload
     * @param array $options
     *
     * @return string
     */
    public function auth($payload, $options = array())
    {
        if (isset($options['lifetime'])) {
            $payload['exp'] = time() + $options['lifetime'];
        }
        $payload = $this->makePayload($payload);
        $header = $this->makeHeader();
        $token = $this->token;
        $jwtContent = self::urlSafeBase64Encode(json_encode($header)).'.'.self::urlSafeBase64Encode(json_encode($payload));

        return $jwtContent.'.'.self::signature($jwtContent, $token, $header['alg']);
    }

    public function valid($jwt)
    {
        $jwtArray = explode('.', $jwt);
        $token = $this->token;

        if (3 != count($jwtArray)) {
            return false;
        }

        list($header64, $payload64, $sign) = $jwtArray;

        $header = json_decode(self::urlSafeBase64Decode($header64), JSON_OBJECT_AS_ARRAY);
        if (empty($header['alg'])) {
            return false;
        }
        $expectSign = self::signature($header64.'.'.$payload64, $token, $header['alg']);

        if ($expectSign !== $sign) {
            return false;
        }

        $payload = json_decode(self::urlSafeBase64Decode($payload64), JSON_OBJECT_AS_ARRAY);
        $currentTime = time();

        if (isset($payload['iat']) && $payload['iat'] > $currentTime) {
            return false;
        }

        if (isset($payload['exp']) && $payload['exp'] < $currentTime) {
            return false;
        }

        return $payload;
    }

    public static function signature($jwtContent, $token, $alg)
    {
        return hash_hmac($alg, $jwtContent, $token);
    }

    protected function makeHeader()
    {
        return array(
            'alg' => self::ALG,
            'typ' => self::TYP,
        );
    }

    protected function makePayload(array $payload)
    {
        $currentTime = time();

        $defaultPayload = array(
            'iss' => 'edusoho',
            'iat' => $currentTime,
            'exp' => $currentTime + 3600,
            'aud' => '',
            'sub' => '',
            'nbf' => '',
            'jti' => '',
        );

        return array_merge($defaultPayload, $payload);
    }

    /**
     * @param $base64String
     * URL base64解码
     * '-' -> '+'
     * '_' -> '/'
     * 字符串长度%4的余数，补'='
     * @return bool|string
     */
    public static function urlSafeBase64Decode($base64String)
    {
        $data = str_replace(array('-', '_'), array('+', '/'), $base64String);
        $mod4 = strlen($data) % 4;
        if ($mod4) {
            $data .= substr('====', $mod4);
        }

        return base64_decode($data);
    }

    /**
     * @param $originString
     *
     * @return mixed|string
     */
    public static function urlSafeBase64Encode($originString)
    {
        $data = base64_encode($originString);
        $data = str_replace(array('+', '/', '='), array('-', '_', ''), $data);

        return $data;
    }
}
