<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommentRepository")
 * @ApiResource(
 *     normalizationContext = { "groups" = { "comment_item_read", "user_collection_read", "story_collection_read" } },
 *     denormalizationContext = { "groups" = { "comment_write" } },
 *     itemOperations = { "get", "put", "delete" },
 *     collectionOperations = {
 *          "get" = { "normalization_context" = { "groups" = { "comment_collection_read", "user_collection_read" } } } ,
 *          "post"
 *     }
 * )
 */
class Comment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"comment_item_read", "comment_collection_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"comment_item_read", "comment_collection_read", "comment_write"})
     * @Assert\NotBlank()
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({ "comment_item_read", "comment_collection_read", "comment_write"})
     * @Assert\NotNull()
     */
    private $author;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"comment_item_read", "comment_collection_read", "comment_write"})
     * @Assert\NotNull()
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"comment_item_read", "comment_collection_read", "comment_write"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Story", inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"comment_item_read", "comment_write"})
     * @Assert\NotNull()
     */
    private $story;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getStory(): ?Story
    {
        return $this->story;
    }

    public function setStory(?Story $story): self
    {
        $this->story = $story;

        return $this;
    }
}
