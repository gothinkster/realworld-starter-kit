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
    ];


    /********************
     *  Relationships
     ********************/

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}