/**
 * --------------------------------------------------------------------------
 * Cookies Module
 *
 * @author 	Bican Marian Valeriu
 * @version 1.0.0
 * --------------------------------------------------------------------------
 */
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

    const body = Selector.findOne('body');
    const cookiesNote = Selector.findOne('#wp-cookies-offcanvas');
    const cookiesForm = Selector.findOne('form[name="wp-cookies"]');

    const necessaryArray = necessary.split(',').map(c => c.trim());
    const necessaryPrefixArray = necessaryPrefix.split(',').map(c => c.trim());

    const Cookies = {
        get(name) {
            const cookies = document.cookie.split('; ').map(c => c.split('=')).reduce((a, [b, c]) => ({ ...a, [b]: c }), {});

            return cookies[name] ? decodeURIComponent(cookies[name]) : '';
        },
        set(name, value, expire = expireTime, path = cookiePath, domain) {
            const { location: { protocol, hostname } } = document;
            const isSecure = protocol === 'https:' ? ';secure' : '';
            domain = domain || hostname;

            const d = new Date();
            d.setTime(d.getTime() + (parseInt(expire) * 24 * 60 * 60 * 1000));

            const expires = d.toUTCString();
            document.cookie = name + "=" + value + ";expires=" + expires + ";path=" + path + ";domain=" + domain + isSecure;
        },
        remove(name) {
            if (Cookies.isNecessary(name)) {
                if (isDevMode) {
                    console.warn(`Cookies :: Cannot remove necessary cookie: ${name}`);
                }

                return;
            }

            Cookies.set(name, '', -1);
            Cookies.set(name, '', -1, '/');
        },
        removeMultiple(cookies = []) {
            cookies.forEach(c => Cookies.remove(c));
        },
        isNecessary(name) {
            return necessaryArray.includes(name) || necessaryPrefixArray.some(prefix => name.match('^' + prefix + '(|.+?)'));
        },
        getChoices() {
            if (!cookiesForm) {
                return document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
            }

            const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);

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

    // Offcanvas events
    Events.on(cookiesNote, 'hide.wp.offcanvas', function ({ relatedTarget = {} }) {
        const { value } = relatedTarget?.dataset || {};
        if (Boolean(value)) {
            body.classList.add(classes?.set);
            body.classList[value === 'true' ? 'add' : 'remove'](classes?.allow);

            Cookies.setChoices(value);
        }
    });

    // Load events
    Events.on(document, 'DOMContentLoaded', () => {
        const cookie = Cookies.get('wp-cookies-status');

        // Respect user choices
        if (!cookie && cookieBlock) {
            // Remove cookies if no preference.
            const cookies = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
            Cookies.removeMultiple(cookies);
            Cookies.set('wp-cookies-blocked', cookies.filter(n => !Cookies.isNecessary(n)).toString());
            // Disable choices for unnecessary cookies if blocked.
            if (cookiesForm) {
                const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
                choices.map(field => field.checked = false);
            }
            // Open cookies offcanvas.
            setTimeout(() => {
                Selector.findOne('#wp-cookies-toggle').click();
                console.log('WP Cookies:: Undefined preferences.');
            }, 250);
        } else if (Cookies.get('wp-cookies-blocked') !== '') {
            const cookies = Cookies.get('wp-cookies-blocked').split(',').map(c => {
                if (cookiesForm) {
                    Selector.findOne(`input[value="${c}"]`, cookiesForm).checked = false;
                }
                return c.trim();
            });
            Cookies.removeMultiple(cookies);
        } else {
            // Enable choiches for unnecessary cookies if not blocked.
            const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
            choices.map(field => field.checked = true);
        }
    });

    /**
     * @static
     * @memberof Component
     */
    wecodeart.Cookies = Cookies;
}).apply(this, [window.wecodeart]);