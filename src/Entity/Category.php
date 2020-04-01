<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 * @ApiResource(
 *     normalizationContext = { "groups" = { "category_item_read", "story_collection_read", "user_collection_read" } },
 *     denormalizationContext = { "groups" = { "category_write" } },
 *     itemOperations={ "get", "put", "delete" },
 *     collectionOperations={ 
 *          "get" = { "normalization_context" = { "groups" = { "category_collection_read" } } },
 *          "post"
 *     }
 * )
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"category_item_read", "category_collection_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"category_item_read", "category_collection_read", "cataegory_write"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"category_item_read", "cataegory_write"})
     * @Assert\NotNull()
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"category_item_read", "cataegory_write"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Story", mappedBy="categories")
     * @Groups({"category_item_read", "cataegory_write"})
     */
    private $stories;

    public function __construct()
    {
        $this->stories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    /**
     * @return Collection|Story[]
     */
    public function getStories(): Collection
    {
        return $this->stories;
    }

    /**
     * Return the number of stories
     * @return int
     * @Groups({"category_item_read", "category_collection_read"})
     */
    public function getStoriesNumber(): int {
        return count($this->stories);
    }

    public function addStory(Story $story): self
    {
        if (!$this->stories->contains($story)) {
            $this->stories[] = $story;
            $story->addCategory($this);
        }

        return $this;
    }

    public function removeStory(Story $story): self
    {
        if ($this->stories->contains($story)) {
            $this->stories->removeElement($story);
            $story->removeCategory($this);
        }

        return $this;
    }
}
