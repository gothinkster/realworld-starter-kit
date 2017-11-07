<?php

namespace Conduit\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer        id
 * @property string         email
 * @property string         username
 * @property string         image
 * @property string         bio
 * @property string         token
 * @property \Carbon\Carbon created_at
 * @property \Carbon\Carbon update_at
 */
class User extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'token',
        'image',
        'bio',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

}