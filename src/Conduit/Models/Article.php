<?php

namespace Conduit\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * @property integer        id
 * @property string         slug
 * @property string         title
 * @property string         description
 * @property string         body
 * @property integer         user_id
 * @property \Carbon\Carbon created_at
 * @property \Carbon\Carbon update_at
 */
class Article extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'slug',
        'title',
        'description',
        'body',
        'user_id',
    ];
}