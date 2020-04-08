<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Story;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class StoryUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    /**
     * StoryUserSubscriber constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForStory', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForStory(ViewEvent $event)
    {
        $story = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();

        if ($story instanceof Story && Request::METHOD_POST === $method) {
            $story->setAuthor($user);
            $story->setCreatedAt(new \DateTime());
        }
        if ($story instanceof Story && Request::METHOD_PUT === $method) {
            $story->setUpdatedAt(new \DateTime());
        }
    }
}