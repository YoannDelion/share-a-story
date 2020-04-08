<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StoryRepository")
 * @ApiResource(
 *     attributes={"order"={"createdAt": "DESC"}},
 *     normalizationContext = { "groups" = { "story_item_read", "comment_collection_read", "category_collection_read", "user_collection_read" } },
 *     denormalizationContext = { "groups" = { "story_write" } },
 *     itemOperations = { "get", "put", "delete" },
 *     collectionOperations={
 *          "get" = { "normalization_context" = { "groups" = { "story_collection_read", "user_collection_read" } } },
 *          "post"
 *     }
 * )
 */
class Story
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"story_item_read", "story_collection_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"story_item_read", "story_write"})
     * @Assert\NotBlank()
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="stories")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"story_item_read", "story_collection_read", "story_wite"})
     * @Assert\NotNull()
     */
    private $author;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"story_item_read", "story_collection_read", "story_write"})
     * @Assert\NotNull()
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"story_item_read", "story_collection_read", "story_write"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="story", orphanRemoval=true)
     * @Groups({"story_item_read"})
     */
    private $comments;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Category", inversedBy="stories")
     * @Groups({"story_item_read", "story_write"})
     */
    private $categories;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    /**
     * Return the preview of the content
     * @return string
     * @Groups("story_collection_read")
     */
    public function getContentPreview(): string
    {
        if (strlen($this->content) < 150) return $this->content;
        return mb_substr($this->content, 0, 150) . '...';
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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * Return number of comment
     * @return int
     * @Groups({"story_item_read", "story_collection_read"})
     */
    public function getCommentsNumber(): int
    {
        return count($this->comments);
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setStory($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getStory() === $this) {
                $comment->setStory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
        }

        return $this;
    }
}
