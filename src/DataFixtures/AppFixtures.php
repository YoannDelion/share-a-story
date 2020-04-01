<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Comment;
use App\Entity\Story;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Faker\Factory;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * AppFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $categories = ['Fun', 'Love', 'Life'];
        $categoryEntities = [];
        $userEntities = [];
        $storyEntities = [];

        foreach ($categories as $c) {
            $category = new Category();
            $category->setName($c)
                ->setCreatedAt($faker->dateTimeBetween());
            $categoryEntities[] = $category;
            $manager->persist($category);
        }

        for ($u = 0; $u < 50; $u++) {
            $user = new User();
            $hash = $this->encoder->encodePassword($user, 'password');
            $user->setEmail($faker->email)
                ->setPassword($hash);

            for ($s = 0; $s < rand(1, 10); $s++) {
                $story = new Story();
                $story->setCreatedAt($faker->dateTimeBetween())
                    ->setAuthor($user)
                    ->setContent($faker->text(500))
                    ->addCategory($categoryEntities[array_rand($categoryEntities)]);
                $storyEntities[] = $story;
                $manager->persist($story);
            }
            $userEntities[] = $user;
            $manager->persist($user);
        }

        for ($c = 0; $c < rand(50, 150); $c++) {
            $comment = new Comment();
            $comment->setAuthor($userEntities[array_rand($userEntities)])
                ->setContent($faker->text)
                ->setCreatedAt($faker->dateTimeBetween())
                ->setStory($storyEntities[array_rand($storyEntities)]);
            $manager->persist($comment);
        }

        $manager->flush();
    }
}
