<?php

namespace AnswersBundle\Controller\Api;

use AnswersBundle\Controller\AbstractController;
use AnswersBundle\Entity\Answer;
use AnswersBundle\Entity\Comment;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("api/answers/{id}/comments")
 * @ParamConverter("answer", class="AnswersBundle:Answer")
 */
class CommentController extends AbstractController
{

    /**
     * @Route("")
     * @Method({"POST"})
     */
    public function store(Answer $answer, Request $request)
    {
        $comment = new Comment($request->get('content'), $answer);

        $this->em()->persist($comment);
        $this->em()->flush();

        return new JsonResponse(compact('comment'));
    }
}