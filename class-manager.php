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
 * @since 		6.5.2
 * @version		6.5.2
 */

 namespace WeCodeArt\Support\Modules\Cookies;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\{ Admin, Singleton };
use WeCodeArt\Config\Interfaces\Configuration;
use function WeCodeArt\Functions\get_prop;

/**
 * Info.
 *
 * @author     Bican Marian Valeriu <marianvaleriubican@gmail.com>
 */
class Manager implements Configuration {

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
        'name',
        'category',
        'description',
        'duration',
        'blockedPatterns'
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
        ];

        \add_action( 'rest_api_init', [ $this, 'register_route' ], 20, 1 );
    }

    /**
     * Register route.
     *
     * @return 	void
     */
	public function register_route(): void {
		register_rest_route( Admin::NAMESPACE, '/manage_cookies', [
			'methods' 				=> \WP_REST_Server::ALLMETHODS,
			'callback'				=> [ $this, 'callback' ],
			'permission_callback' 	=> '__return_true',
		] );
	}

    /**
     * Register route.
     *
     * @return 	WP_REST_Response
     */
	public function callback( \WP_REST_Request $request ): \WP_REST_Response {
        $params     = $request->get_params();
        list( $file_path, $data ) = $this->handle_json_file();

        $modified = false;
        if( get_prop( $params, [ 'remove' ] ) ) {
            unset( $data[get_prop( $params, [ 'name' ] )] );
            $this->forget( get_prop( $params, [ 'name' ] ) );
            $modified = true;
        } elseif( count( $params ) ) {
            $data[get_prop( $params, [ 'name' ] )]  = wp_array_slice_assoc( $params, self::VALID_PROPERTIES );
            $modified = true;
        }
        
        if( $modified ) {
            // Save the updated data back to the file.
            file_put_contents( $file_path, json_encode( $data ) );
        }
		
		return rest_ensure_response( $this->all() );
	}

    /**
     * Handle JSON file
     *
     * @return 	array
     */
    public function handle_json_file(): array {
        $upload_dir = wp_upload_dir();
        $file_path = $upload_dir['basedir'] . '/wp-cookies.json';
    
        // Check if the file exists or create it.
        if ( ! file_exists( $file_path ) ) {
            file_put_contents( $file_path, json_encode( [] ) );
        }
    
        // Get the contents of the file.
        $file_contents = file_get_contents( $file_path );
        $data = json_decode( $file_contents, true );
    
        return [ $file_path, $data ];
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
        list( $file_path, $data ) = $this->handle_json_file();

        foreach( $data as $key => $cookie ) {
            $this->set( $key, $cookie );
        }

        return $this->items;
    }
}