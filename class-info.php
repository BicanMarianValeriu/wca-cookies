<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Modules\Cookies\List
 * @copyright   Copyright (c) 2024, WeCodeArt Framework
 * @since 		6.4.5
 * @version		6.4.5
 */

 namespace WeCodeArt\Support\Modules\Cookies;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Config\Traits\Singleton;
use WeCodeArt\Config\Interfaces\Configuration;
use function WeCodeArt\Functions\get_prop;

/**
 * Info.
 *
 * @author     Bican Marian Valeriu <marianvaleriubican@gmail.com>
 */
class Info implements Configuration {

    use Singleton;

    /**
     * All of the conditional items.
     *
     * @var array
     */
    protected $items = [];

    /**
	 * Container of valid json properties.
	 *
	 * @var array
	 */
	const VALID_PROPERTIES = [
        'category',
        'description',
        'duration'
    ];

    /**
     * Send to constructor
     */
    public function init(): void {
        $this->items = [
            'wordpress_test_cookie' => [
                'category'      => 'necessary',
                'description'   => __( 'WordPress cookie for a logged in user.', 'wecodeart' ),
                'duration'      => __( 'Session', 'wecodeart' )
            ],
            'wp-cookies-status' => [
                'category'      => 'necessary',
                'description'   => __( 'Contains information about your cookie preferences.', 'wecodeart' ),
                'duration'      => sprintf( __( '%s days', 'wecodeart' ), get_prop( wecodeart_option( 'cookies' ), [ 'expire' ], 30 ) )
            ],
            'wp-cookies-blocked' => [
                'category'      => 'necessary',
                'description'   => __( 'Contains information about your blocked cookies.', 'wecodeart' ),
                'duration'      => sprintf( __( '%s days', 'wecodeart' ), get_prop( wecodeart_option( 'cookies' ), [ 'expire' ], 30 ) )
            ],
            'wp-settings-1' => [
                'category'      => 'necessary',
                'description'   => __( 'WordPress also sets a few wp-settings-[UID] cookies. The number on the end is your individual user ID from the users database table. This is used to customize your view of admin interface, and possibly also the main site interface.', 'wecodeart' ),
                'duration'      => '1 year'
            ],
            'wp-settings-time-1' => [
                'category'      => 'necessary',
                'description'   => __( 'WordPress also sets a few wp-settings-{time}-[UID] cookies. The number on the end is your individual user ID from the users database table. This is used to customize your view of admin interface, and possibly also the main site interface.', 'wecodeart' ),
                'duration'      => '1 year'
            ],
            'woocommerce_cart_hash' => [
                'category'      => 'necessary',
                'description'   => __( 'Stores an encoded string representing the contents of the WooCommerce shopping cart.', 'wecodeart' ),
                'duration'      => '1 day'
            ],
            'woocommerce_items_in_cart' => [
                'category'      => 'necessary',
                'description'   => __( 'Records if there are any items in the WooCommerce shopping cart.', 'wecodeart' ),
                'duration'      => '1 day'
            ],
            'lang' => [
                'category'      => 'functional',
                'description'   => __( 'LinkedIn sets this cookie to remember a user\'s language setting.', 'wecodeart' ),
                'duration'      => __( 'Session', 'wecodeart' )
            ],
            '_ga' => [
                'category'      => 'analytics',
                'description'   => __( 'Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site\'s analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.', 'wecodeart' ),
                'duration'      => '2 years'
            ],
            '_gcl_au' => [
                'category'      => 'analytics',
                'description'   => __( 'Provided by Google Tag Manager to experiment advertisement efficiency of websites using their services.', 'wecodeart' ),
                'duration'      => '3 months'
            ],
            '_gid' => [
                'category'      => 'analytics',
                'description'   => __( 'Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website\'s performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.', 'wecodeart' ),
                'duration'      => '1 day'
            ],
            'CONSENT' => [
                'category'      => 'analytics',
                'description'   => __( 'YouTube sets this cookie via embedded youtube-videos and registers anonymous statistical data.', 'wecodeart' ),
                'duration'      => '1 year'
            ],
            '_GRECAPTCHA' => [
                'category'      => 'necessary',
                'description'   => __( 'Cookie used by ReCaptcha functionality to allow anti-bot validation in different forms.', 'wecodeart' ),
                'duration'      => '6 months'
            ],
            '_fbp' => [
                'category'      => 'advertisements',
                'description'   => __( 'This cookie is set by Facebook to display advertisements when either on Facebook or on a digital platform powered by Facebook advertising, after visiting the website.', 'wecodeart' ),
                'duration'      => '3 months'
            ],
        ];
    }

    /**
     * Set a given conditional value.
     *
     * @param  array|string  $key
     * @param  mixed   $value
     *
     * @return void
     */
    public function set( $key, $value = null ): void {
        $keys = is_array( $key ) ? $key : [ $key => $value ];

        foreach ( $keys as $key => $value ) {
            $valid = wp_array_slice_assoc( $value, self::VALID_PROPERTIES );
            $valid = array_map( 'sanitize_text_field', $valid );

            $this->items[$key] = $valid;
        }
    }

    /**
     * Determine if the given conditional value exists.
     *
     * @param  string  $key
     *
     * @return bool
     */
    public function has( $key ): bool {
        return isset( $this->items[$key] );
    }

    /**
     * Get the specified conditional value.
     *
     * @param  string  $key
     * @param  mixed   $default
     *
     * @return mixed
     */
    public function get( $key, $default = null ) {
        if ( ! isset( $this->items[$key] ) ) {
            return $default;
        }

        return $this->items[$key];
    }

    /**
     * Removes integration from the container.
     *
     * @param  string  $key
     *
     * @return bool
     */
    public function forget( $key ): void {
		unset( $this->items[$key] );
    }

    /**
     * Get all of the conditional items for the application.
     *
     * @return array
     */
    public function all(): array {
        return $this->items;
    }
}