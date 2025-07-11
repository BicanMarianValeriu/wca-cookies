<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Modules\Cookies
 * @copyright   Copyright (c) 2024, WeCodeArt Framework
 * @since 		6.5.2
 * @version		6.6.1
 */

namespace WeCodeArt\Support\Modules\Cookies;

defined( 'ABSPATH' ) || exit;

use function WeCodeArt\Functions\get_prop;

/**
 * The Helpers object.
 */
trait Helpers {

	/**
	 * Remove specific cookies if they are not strictly necessary.
	 *
	 * @param 	string|null	$blocked 	Optional. Blocked cookies.
	 *
	 * @return 	void
	 */
	private function remove_specific_cookies( ?string $blocked = null ): void {
		list( $a, $b ) = $this->get_necessary_cookies();
		
		$blocked_cookies = [];
        if ( $blocked ) {
            $blocked_cookies = array_unique( array_map( 'trim', explode( ',', sanitize_text_field( $blocked ) ) ) );
        }

        // Get blocked patterns from manager
        $blocked_patterns = $this->get_blocked_patterns();

        // Remove cookies from $_COOKIE superglobal
        foreach ( $_COOKIE as $name => $value ) {
            if ( ! $this->is_necessary_cookie( $name, $a, $b ) ) {
                $should_block = is_null( $blocked ) || in_array( $name, $blocked_cookies ) || $this->matches_blocked_pattern( $name, $blocked_patterns );
                if ( $should_block ) {
                    $this->set_cookie( $name, '', ( time() - 8640000 ) );
                }
            }
        }

		// Remove headers that set non-strictly necessary cookies
        foreach ( headers_list() as $h ) {
            if ( preg_match( '/^Set-Cookie:\s*([^=]+)=/i', $h, $m ) ) {
				$name = trim( $m[1] );
				if( ! $this->is_necessary_cookie( $name, $a, $b ) ) {
                    $should_block = is_null( $blocked ) || in_array( $name, $blocked_cookies ) || $this->matches_blocked_pattern( $name, $blocked_patterns );
					if ( $should_block ) {
						header( "Set-Cookie: {$name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; HttpOnly" );
					}
				}
            }
        }
	}

	/**
     * Get strictly necessary cookies from the configuration.
     *
     * @return 	array	An array containing two arrays: necessary cookies and necessary family cookies
     */
    private function get_necessary_cookies(): array {
        // Define strictly necessary cookies
		$cookies 	= array_map( 'trim', explode( ',', get_prop( $this->config, [ 'cookies', 'necessary' ], '' ) ) );
		
        // Define strictly necessary cookies patterns
		$families 	= array_map( 'trim', explode( ',', get_prop( $this->config, [ 'cookies', 'necessaryPrefix' ], '' ) ) );
		$families[]	= 'wp-cookies-'; // Adding our prefix

        return [ array_unique( $cookies ), array_unique( $families ) ];
    }

	/**
	 * Check if specific cookies are strictly necessary.
	 *
	 * @param 	string	$name
	 * @param 	array	$necessary
	 * @param 	array 	$necessary_family
	 *
	 * @return 	bool
	 */
	private function is_necessary_cookie( $name, $necessary, $necessary_family ): bool {
		if ( in_array( $name, $necessary ) ) {
			return true;
		}

		foreach ( $necessary_family as $pattern ) {
			if ( preg_match( '/^' . preg_quote( $pattern, '/' ) . '(|.+?)/si', $name ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get blocked patterns from manager
	 *
	 * @return 	array
	 */
	private function get_blocked_patterns(): array {
		$patterns = [];
		$all_cookies = $this->manager->all();
		
		foreach ( $all_cookies as $cookie_data ) {
			if ( isset( $cookie_data['blockedPatterns'] ) && ! empty( $cookie_data['blockedPatterns'] ) ) {
				$cookie_patterns = array_map( 'trim', explode( ',', $cookie_data['blockedPatterns'] ) );
				$patterns = array_merge( $patterns, $cookie_patterns );
			}
		}
		
		return array_unique( $patterns );
	}

	/**
	 * Check if cookie name matches any blocked pattern
	 *
	 * @param 	string	$cookie_name
	 * @param 	array	$blocked_patterns
	 *
	 * @return 	bool
	 */
	private function matches_blocked_pattern( string $cookie_name, array $blocked_patterns ): bool {
		foreach ( $blocked_patterns as $pattern ) {
			// Convert wildcard pattern to regex
			$regex_pattern = str_replace( '*', '.*', preg_quote( $pattern, '/' ) );
			if ( preg_match( '/^' . $regex_pattern . '$/i', $cookie_name ) ) {
				return true;
			}
		}
		
		return false;
	}

	/**
	 * Set cookie
	 *
	 * @param 	string 		$name
	 * @param 	string 		$value
	 * @param 	int 		$expire
	 * @param 	bool 		$secure
	 * 
	 * @return 	void
	 */
	private function set_cookie( $name, $value, $expire = 0, $secure = false ): void {
		if ( ! headers_sent() ) {
			setcookie( $name, $value, $expire, COOKIEPATH, COOKIE_DOMAIN, $secure, true );
		} elseif ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			headers_sent( $file, $line );
			trigger_error( "{$name} cookie cannot be set - headers already sent by {$file} on line {$line}", E_USER_NOTICE ); // @codingStandardsIgnoreLine
		}
	}
}