<?php

namespace AnswersBundle\Controller\Api;

use AnswersBundle\Controller\AbstractController;
use AnswersBundle\Entity\Answer;
use Carbon\Carbon;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("api/answers")
 */
class AnswerController extends AbstractController

{

    /**
     * @Route("")
     * @Method("POST")
     */
    public function store(Request $request)
    {
        $answer = new Answer($request->get('title'), $request->get('content'));
        $this->em()->persist($answer);
        $this->em()->flush();

        return new JsonResponse(compact('answer'));
    }

    /**
     * @Route("/{id}")
     * @ParamConverter("answer", class="AnswersBundle:Answer")
     */
    public function show(Answer $answer)
    {
        return new JsonResponse(compact('answer'));
    }
}