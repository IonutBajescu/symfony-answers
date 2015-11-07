<?php

namespace AnswersBundle\Controller;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AbstractController extends Controller
{

    /**
     * @return EntityManager
     */
    public function em()
    {
        return $this->getDoctrine()->getManager();
    }

    /**
     * @return EntityRepository
     */
    public function repo($entityName)
    {
        return $this->em()->getRepository($entityName);
    }
}