<?php

namespace AnswersBundle\Controller;


use Symfony\Bundle\TwigBundle\Controller\ExceptionController;
use Symfony\Component\Debug\Exception\FlattenException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Log\DebugLoggerInterface;

class ExceptionsController extends ExceptionController
{

    /**
     * @var ContainerInterface
     */
    private $kernel;

    public function __construct(\Twig_Environment $twig, $debug, \AppKernel $kernel)
    {
        $this->twig = $twig;
        $this->debug = $debug;
        $this->kernel = $kernel;
        parent::__construct($twig, $debug);
    }


    public function showException(Request $request, FlattenException $exception, DebugLoggerInterface $logger = null)
    {
        if ($exception->getClass() == NotFoundHttpException::class) {
            return new Response(file_get_contents($this->kernel->getRootDir().'/../web/app.html'));
        }

        return parent::showAction($request, $exception, $logger);
    }
}