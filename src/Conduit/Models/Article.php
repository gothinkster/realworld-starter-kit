<?php

namespace Conduit\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * @property integer        id
 * @property string         slug
 * @property string         title
 * @property string         description
 * @property string         body
 * @property integer        user_id
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

    public function setSlugAttribute($value)
    {
        $index = 0;
        $slug = $value;
        while (self::newQuery()
            ->where('slug', $slug)
            ->where('id', '!=', $this->id)
            ->exists()) {
            $slug = $value . '-' . ++$index;
        }

        return $this->attributes['slug'] = $slug;
    }

    /********************
     *  Relationships
     ********************/

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}