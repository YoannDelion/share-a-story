<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Comment;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CommentUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    /**
     * CommentUserSubscriber constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForComment', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForComment(ViewEvent $event)
    {
        $comment = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();

        if ($comment instanceof Comment && Request::METHOD_POST === $method) {
            $comment->setAuthor($user);
            $comment->setCreatedAt(new \DateTime());
        }
        if ($comment instanceof Comment && Request::METHOD_PUT === $method) {
            $comment->setUpdatedAt(new \DateTime());
        }
    }
}