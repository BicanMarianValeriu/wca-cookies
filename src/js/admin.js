/**
 * @package: 	WeCodeArt Cookies Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

import {
    Toggler,
    CookiesTable,
    ModalOpts,
    TogglerOpts,
    OffcanvasOpts,
    NotificationsOpts
} from './Components';

const {
    i18n: {
        __,
        _x,
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Button,
        Notice,
        TabPanel,
        TextControl,
        ToggleControl,
        __experimentalNumberControl: NumberControl,
    },
    element: {
        useState,
    },
    blockEditor: {
        useSetting,
    },
} = wp;

const getEditorUrl = (object = {}) => {
    const url = new URL(`${wecodeart.adminUrl}/site-editor.php`);
    Object.keys(object).map(key => url.searchParams.append(key, object[key]));

    return url.toString();
}

addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/cookies/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'wca-cookies',
        title: __('Cookies', 'wecodeart'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading', 'wecodeart'),
            instructions: __('Please wait, loading settings...', 'wecodeart')
        }} />;
    }

    const apiOptions = (({ cookies }) => (cookies))(settings);
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState(apiOptions);
    const [cookies, setCookies] = useState(false);

    const setStyle = (extra = {}, container = 'offcanvas') => {
        const newStyle = { ...formData?.[container]?.style, ...extra };

        setFormData({
            ...formData, ...{
                [container]: {
                    ...formData?.[container],
                    style: newStyle
                }
            }
        });
    };

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'wecodeart'));
    };

    const colors = useSetting('color.palette');

    return (
        <>
            {formData.notice !== false && (
                <Notice status="info" className="border-top border-bottom border-end mb-3" onRemove={() => setFormData({ ...formData, notice: false })}>
                    <p className="my-0" dangerouslySetInnerHTML={{
                        __html: sprintf(
                            _x('You can edit module messages/templates under %s.', 'wecodeart'),
                            `<a href="${getEditorUrl({
                                path: '/patterns',
                                categoryType: 'wp_template_part',
                                categoryId: 'wca-cookies',
                            })}" target="_blank">${__('Site Editor', 'wecodeart')}</a>`
                        )
                    }} />
                </Notice>
            )}
            <TabPanel
                onSelect={() => { }}
                tabs={[
                    {
                        name: 'cookies',
                        title: __('Cookies', 'wecodeart'),
                        render:
                        <CookiesTable {...{
                            formData,
                            setFormData,
                            cookies,
                            setCookies,
                            createNotice
                        }} />
                    },
                    {
                        name: 'settings',
                        title: __('Settings', 'wecodeart'),
                        render:
                            <>
                                <Card className="border shadow-none">
                                    <CardHeader>
                                        <h5 className="text-uppercase fw-medium m-0">{__('Cookies', 'wecodeart')}</h5>
                                    </CardHeader>
                                    <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                                        <p>
                                            <ToggleControl
                                                label={__('Block cookies', 'wecodeart')}
                                                checked={formData?.cookies?.block}
                                                onChange={block => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        block
                                                    }
                                                })}
                                                help={sprintf(
                                                    __('Cookies are %s until preference is set.', 'wecodeart'),
                                                    formData?.cookies?.block ? __('blocked', 'wecodeart') : __('not blocked', 'wecodeart')
                                                )}
                                            />
                                        </p>
                                        <p>
                                            <NumberControl
                                                label={__('Expiration', 'wecodeart')}
                                                value={formData?.cookies?.expire}
                                                onChange={expire => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        expire
                                                    }
                                                })}
                                                help={__('Duration for cookie accept|reject - in days.', 'wecodeart')}
                                            />
                                        </p>
                                        <p>
                                            <TextControl
                                                label={__('Necessary cookies', 'wecodeart')}
                                                value={formData?.cookies?.necessary}
                                                onChange={necessary => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        necessary
                                                    }
                                                })}
                                                help={__('These cookies are stictly necessary and website cannot function properly without them.', 'wecodeart')}
                                            />
                                        </p>
                                        <p>
                                            <TextControl
                                                label={__('Necessary cookies prefix', 'wecodeart')}
                                                value={formData?.cookies?.necessaryPrefix}
                                                onChange={necessaryPrefix => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        necessaryPrefix
                                                    }
                                                })}
                                                help={__('Cookies starting with these prefixes will also be considered necessary.', 'wecodeart')}
                                            />
                                        </p>
                                    </CardBody>
                                </Card>
                                <hr style={{ margin: '20px 0' }} />
                                <Button
                                    className="button"
                                    isPrimary
                                    isLarge
                                    icon={loading && <Spinner />}
                                    onClick={() => {
                                        setLoading(true);
                                        saveSettings({ cookies: formData }, handleNotice);
                                    }}
                                    {...{ disabled: loading }}
                                >
                                    {loading ? '' : __('Save', 'wecodeart')}
                                </Button>
                            </>

                    },
                    {
                        name: 'design',
                        title: __('Design', 'wecodeart'),
                        render:
                            <>
                                <div className="grid" style={{ '--wca--columns': 2 }}>
                                    <div className="g-col-1">
                                        <OffcanvasOpts {...{ formData, setFormData, setStyle, colors }} />
                                    </div>
                                    <div className="g-col-1">
                                        <ModalOpts {...{ formData, setFormData, setStyle, colors }} />
                                    </div>
                                    <div className="g-col-1">
                                        <TogglerOpts {...{ formData, setFormData, setStyle, colors }} />
                                    </div>
                                    <div className="g-col-1">
                                        <NotificationsOpts {...{ formData, setFormData }} />
                                    </div>
                                </div>
                                <Toggler {...{ formData: formData?.toggler }} />
                                <hr style={{ margin: '20px 0' }} />
                                <Button
                                    className="button"
                                    isPrimary
                                    isLarge
                                    icon={loading && <Spinner />}
                                    onClick={() => {
                                        setLoading(true);
                                        saveSettings({ cookies: formData }, handleNotice);
                                    }}
                                    {...{ disabled: loading }}
                                >
                                    {loading ? '' : __('Save', 'wecodeart')}
                                </Button>
                            </>
                    },
                ]}>
                {({ render }) => render}
            </TabPanel>
        </>
    );
};

export default Options;