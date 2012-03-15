<?php
class UNL_TourMap_MarkerList_Sculptures implements UNL_TourMap_MarkerList
{
    public $sculptures;

    public $valid = false;

    function __construct($options = array())
    {
        $this->rewind();
    }

    function key()
    {
        return $this->sculptures->id;
    }

    function current()
    {
        $name = $this->sculptures->title;
        $position = new UNL_TourMap_LatLng(array('lat'=>$this->sculptures->lat, 'lng'=>$this->sculptures->lon));
        $code = (string)$this->key();
        return new UNL_TourMap_Marker_Sculpture(array('position'=>$position, 'title'=>$name, 'code'=>$code));
    }

    function next()
    {
        if (!$this->sculptures->fetch()) {
            $this->valid = false;
        }
    }

    function valid()
    {
        return $this->valid;
    }

    function rewind()
    {
        $this->sculptures = new UNL_Common_Sculptures();
        if ($this->sculptures->find()) {
            // all ok
            $this->valid = true;
        }
    }
}