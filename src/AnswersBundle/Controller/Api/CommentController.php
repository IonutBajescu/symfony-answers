<?php

namespace AnswersBundle\Controller\Api;

use AnswersBundle\Entity\Comment;
use AnswersBundle\Entity\Answer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class CommentController extends Controller
{

    public function index()
    {

    }

    public function store(Request $request)
    {
        new Answer();
    }
}