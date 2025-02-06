/**
 * --------------------------------------------------------------------------
 * Cookies Module
 *
 * @author 	Bican Marian Valeriu
 * @version 1.0.0
 * --------------------------------------------------------------------------
 */
import './../scss/index.scss';

export default (function (wecodeart) {
    const {
        Events,
        Selector,
        isDevMode
    } = wecodeart;

    const {
        classes = [],
        cookiePath = '/',
        toast: { },
        cookies: {
            necessary = '',
            necessaryPrefix = '',
            expire: expireTime = 30,
            block: cookieBlock = false
        } = {}
    } = wecodeartSupportModulesCookies || {};

    const cookiesForm = Selector.findOne('form[name="wp-cookies"]');

    const necessaryArray = necessary.split(',').map(c => c.trim());
    const necessaryPrefixArray = necessaryPrefix.split(',').map(c => c.trim());

    const Cookies = {
        get(name) {
            const cookies = document.cookie.split('; ').map(c => c.split('=')).reduce((a, [b, c]) => ({ ...a, [b]: c }), {});

            return cookies[name] ? decodeURIComponent(cookies[name]) : '';
        },
        set(name, value, expire = expireTime, path = cookiePath, domain) {
            const { protocol } = window.location;
            const isSecure = protocol === 'https:' ? ';secure' : '';
            const domainParts = hostname.split('.');
            const isSubdomain = domainParts.length > 2;
            const mainDomain = isSubdomain ? domainParts.slice(-2).join('.') : hostname;
            const domainString = domain ? `;domain=${domain}` : (isSubdomain ? `;domain=.${mainDomain}` : '');

            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (expire * 24 * 60 * 60 * 1000));
            const expires = `;expires=${expireDate.toUTCString()}`;

            const cookieString = `${name}=${value}${expires};path=${path}${domainString}${isSecure}`;
            document.cookie = cookieString;
        },
        remove(name) {
            if (Cookies.isNecessary(name)) {
                if (isDevMode) {
                    console.warn(`Cookies :: Cannot remove necessary cookie: ${name}`);
                }

                return;
            }

            const { hostname } = window.location;
            const domainParts = hostname.split('.');
            const isSubdomain = domainParts.length > 2;
            const mainDomain = isSubdomain ? domainParts.slice(-2).join('.') : hostname;

            // Remove from current domain and possible main domain
            Cookies.set(name, '', -1, '/');
            if (isSubdomain) {
                Cookies.set(name, '', -1, '/', `.${mainDomain}`);
            }
        },
        removeMultiple(cookies = []) {
            cookies.forEach(Cookies.remove);
        },
        isNecessary(name) {
            return necessaryArray.includes(name) || necessaryPrefixArray.some(prefix => name.match('^' + prefix + '(|.+?)'));
        },
        getChoices() {
            let choices = [];

            if (!cookiesForm) {
                choices = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim()).filter(c => !Cookies.isNecessary(c));
                const blockedCookies = Cookies.get('wp-cookies-blocked');
                if (blockedCookies) {
                    choices = [...choices, blockedCookies.split(',').map(c => c.trim())];
                }

                return choices;
            }

            choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);

            return Array.from(choices).filter(({ checked }) => checked === false).map(({ value }) => value);
        },
        setChoices(value) {
            let choices = [];
            if (cookiesForm) {
                choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
            }

            Cookies.set('wp-cookies-status', value);
            switch (value) {
                // Accept cookies
                case 'true':
                    choices.map(field => field.checked = true);
                    Cookies.set('wp-cookies-blocked', '');
                    break;
                // Reject cookies
                case 'false':
                    choices.map(field => field.checked = false);
                    Cookies.set('wp-cookies-blocked', Cookies.getChoices().toString());
                    break;
                // Update preferences
                case 'save':
                    Cookies.set('wp-cookies-status', 'true');
                    Cookies.set('wp-cookies-blocked', Cookies.getChoices().toString());
                    Cookies.removeMultiple(Cookies.getChoices());
                    break;
            }
        }
    };

    // Load events
    Events.on(document, 'DOMContentLoaded', () => {
        const cookie = Cookies.get('wp-cookies-status');

        // Respect user choices
        if (cookie) {
            // Handle switches based on user preference.
            let blockedCookies = Cookies.get('wp-cookies-blocked') ?? [];
            if (blockedCookies) {
                blockedCookies = blockedCookies.split(',').map(c => c.trim());
                Cookies.removeMultiple(blockedCookies);
            }

            // Handle switches based on block (for cache).
            if (cookiesForm) {
                const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
                choices.map(field => field.checked = blockedCookies.includes(field.value) ? false : true);
            }
        } else {
            // Remove cookies if no preference.
            if (cookieBlock) {
                const cookies = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
                Cookies.removeMultiple(cookies);
                Cookies.set('wp-cookies-blocked', cookies.filter(n => !Cookies.isNecessary(n)).toString());
            }

            // Adjust choices if form exists (for cache).
            if (cookiesForm) {
                const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
                choices.map(field => field.checked = cookieBlock ? false : true);
            }

            // Open cookies offcanvas.
            setTimeout(() => {
                Selector.findOne('#wp-cookies-toggle').click();
                console.log('WP Cookies: Undefined preferences.');
            }, 500);
        }
    });

    /**
     * @static
     * @memberof Component
     */
    wecodeart.Cookies = Cookies;
}).apply(this, [window.wecodeart]);