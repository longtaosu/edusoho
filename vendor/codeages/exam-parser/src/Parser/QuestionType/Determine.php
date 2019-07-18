<?php

namespace ExamParser\Parser\QuestionType;

use ExamParser\Constants\QuestionElement;

class Determine extends AbstractQuestion
{
    const ANSWER_RIGHT_SIGNAL = '<#正确#>';

    const ANSWER_WRONG_SIGNAL = '<#错误#>';

    public function convert($questionLines)
    {
        $question = array(
            'type' => 'determine',
            'stem' => '',
            'difficulty' => 'normal',
            'score' => 2.0,
            'analysis' => '',
            'answer' => null,
        );
        $answers = array();
        $preNode = QuestionElement::STEM;
        foreach ($questionLines as $line) {
            //处理答案
            if ($this->matchAnswer($question, $line, $preNode)) {
                continue;
            }
            //处理难度
            if ($this->matchDifficulty($question, $line, $preNode)) {
                continue;
            }
            //处理分数
            if ($this->matchScore($question, $line, $preNode)) {
                continue;
            }

            //处理解析
            if ($this->matchAnalysis($question, $line, $preNode)) {
                continue;
            }

            if (QuestionElement::STEM == $preNode) {
                $question['stem'] .= preg_replace('/^\d{0,5}(\.|、|。|\s)/', '', $line).PHP_EOL;
            }
        }

        return $question;
    }

    protected function matchAnswer(&$question, $line, &$preNode)
    {
        $pattern = '/('.self::ANSWER_RIGHT_SIGNAL.'|'.self::ANSWER_WRONG_SIGNAL.')/';
        if (preg_match($pattern, $line, $matches)) {
            if (self::ANSWER_RIGHT_SIGNAL == $matches[0]) {
                $question['answer'] = true;
            }
            if (self::ANSWER_WRONG_SIGNAL == $matches[0]) {
                $question['answer'] = false;
            }

            $stemStr = str_replace(self::ANSWER_RIGHT_SIGNAL, '', $line);
            $stemStr = str_replace(self::ANSWER_WRONG_SIGNAL, '', $stemStr);
            $question['stem'] .= preg_replace('/^\d{0,5}(\.|、|。|\s)/', '', $stemStr).PHP_EOL;
            $preNode = QuestionElement::ANSWER;

            return true;
        }

        return false;
    }
}
