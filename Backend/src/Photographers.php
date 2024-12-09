<?php

namespace Rachaelhogan\PhotographyService\Backend;

class Photographers
{
    private $photographers;

    /**
     * @throws \Exception
     */
    public function __construct()
    {
        $filePath = __DIR__ . '/photographers.json';

        if (!file_exists($filePath)) {
            throw new \Exception("File not found: " . $filePath);
        }
        $this->photographers = json_decode(file_get_contents($filePath), true);

    }

    public function getPhotographers(): array
    {
        return $this->photographers;
    }

    public function getPhotographersById($id): array
    {
        $photographerID = (int)$id;
        $photographer = array_filter($this->photographers, fn($p) => $p['id'] === $photographerID);
        return array_values($photographer);
    }

    public function getPhotographersByEventType($eventType): array{
        $filteredPhotographers = array_filter($this-> photographers, fn($p) => $p['event_type'] === $eventType);
        return array_values($filteredPhotographers);

    }
}
