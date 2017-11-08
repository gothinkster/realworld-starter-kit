<?php

namespace Conduit\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * @property string         title
 * @property integer         article_id
 * @property \Carbon\Carbon created_at
 * @property \Carbon\Carbon update_at
 */
class Tag extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'article_id',
    ];


    /********************
     *  Relationships
     ********************/

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
}