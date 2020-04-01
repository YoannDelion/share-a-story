<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Category;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CategorySubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setCategoryDateTime', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setCategoryDateTime(ViewEvent $event)
    {
        $category = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($category instanceof Category && Request::METHOD_POST === $method) {
            $category->setCreatedAt(new \DateTime());
        }
        if ($category instanceof Category && Request::METHOD_PUT === $method) {
            $category->setUpdatedAt(new \DateTime());
        }
    }
}