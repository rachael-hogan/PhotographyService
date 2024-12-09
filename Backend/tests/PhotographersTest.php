<?php

use PHPUnit\Framework\TestCase;
use Rachaelhogan\PhotographyService\Backend\Photographers;

class PhotographersTest extends TestCase
{
    private $photographers;

    protected function setUp(): void
    {
        $filePath = realpath(__DIR__ . '/../src/photographers.json');
        $jsonContent = file_get_contents($filePath);
        $this->photographers = json_decode($jsonContent, true);
    }

    public function testGetAllPhotographers()
    {
        $photographers = new Photographers();
        $result = $photographers->getPhotographers();
        $this->assertEquals($this->photographers, $result);
    }

    public function testGetPhotographerById()
    {
        $photographers = new Photographers();
        $photographerID = 1; // Example ID
        $expectedPhotographer = array_values(array_filter($this->photographers, function ($p) use ($photographerID) {
            return $p['id'] === $photographerID;
        }));
        $result = $photographers->getPhotographersById($photographerID);
        $this->assertEquals($expectedPhotographer, $result);
    }

    public function testGetPhotographersByEventType()
    {
        $photographers = new Photographers();
        $eventType = 'wedding'; // Example event type
        $expectedPhotographers = array_values(array_filter($this->photographers, function ($p) use ($eventType) {
            return $p['event_type'] === $eventType;
        }));
        $result = $photographers->getPhotographersByEventType($eventType);
        $this->assertEquals($expectedPhotographers, $result);
    }
}
