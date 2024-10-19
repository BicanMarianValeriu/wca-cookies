const {
    i18n: {
        __,
    },
    components: {
        Modal,
        Button,
        ButtonGroup,
        TextControl,
        TextareaControl,
        SelectControl,
        Spinner,
        Placeholder,
        Dashicon,
        Tooltip
    },
    element: {
        useEffect,
        useState,
        useRef,
    },
} = wp;

const { categories = [] } = wecodeartCookies || {};

const ManageCookie = ({ closeModal, createNotice, currentCookie, setCookies }) => {
    const [data, setData] = useState(currentCookie ?? { name: '', duration: '', category: '', description: '' });
    const [doingAjax, setDoingAjax] = useState(null);
    const formRef = useRef(null);

    const handleCookie = async () => {
        setDoingAjax(true);

        const formData = new FormData(formRef.current);
        if (currentCookie) {
            // Add name for editing cookie (as the input is disabled);
            formData.set('name', currentCookie?.name);
        }

        const response = await fetch(`${wecodeart.restUrl}/manage_cookies`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        setCookies(data);
        setDoingAjax(false);

        createNotice('success', sprintf(__('Cookie %s.', 'wecodeart'), currentCookie ? __('updated', 'wecodeart') : __('added', 'wecodeart')));

        closeModal();
    };

    const objectHasEmptyValues = (obj) => Object.keys(obj).filter(key => obj[key] === '').length;

    return (
        <Modal title={currentCookie ? sprintf(__('Edit "%s" cookie', 'wecodeart'), currentCookie?.name) : __('Add cookie', 'wecodeart')} onRequestClose={closeModal}>
            <form ref={formRef}>
                <TextControl
                    label={__('Cookie name', 'wecodeart')}
                    name="name"
                    value={data?.name}
                    disabled={currentCookie}
                    required
                    onChange={(name) => setData({ ...data, name })}
                />
                <TextControl
                    label={__('Duration', 'wecodeart')}
                    name="duration"
                    help={__('Cookie duration - a string like: 30 days.', 'wecodeart')}
                    required
                    value={data?.duration}
                    onChange={(duration) => setData({ ...data, duration })}
                />
                <SelectControl
                    label={__('Category', 'wecodeart')}
                    name="category"
                    options={Object.keys(categories).map(key => {
                        return {
                            label: key === 'null' ? __('Select a category', 'wecodeart') : categories[key],
                            value: key === 'null' ? '' : key,
                            disabled: key === 'null'
                        }
                    })}
                    help={__('Cookie category to be used on filters.', 'wecodeart')}
                    required
                    value={data?.category}
                    onChange={(category) => setData({ ...data, category })}
                />
                <TextareaControl
                    label={__('Description', 'wecodeart')}
                    name="description"
                    cols="50"
                    help={__('Cookie information related to the cookie.', 'wecodeart')}
                    required
                    value={data?.description}
                    onChange={(description) => setData({ ...data, description })}
                />
                <Button
                    className="button d-flex gap-2"
                    isPrimary
                    disabled={doingAjax || objectHasEmptyValues(data)}
                    icon={doingAjax && <Spinner style={{ margin: 0 }} />}
                    onClick={handleCookie}
                >
                    {currentCookie ? __('Update cookie', 'wecodeart') : __('Add cookie', 'wecodeart')}
                </Button>
            </form>
        </Modal>
    );
}

const CookiesTable = ({ formData, setFormData, cookies, setCookies, createNotice }) => {
    const [currentCookie, setCurrentCookie] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [doingAjax, setDoingAjax] = useState(false);

    useEffect(() => {
        async function fetchCookies() {
            const response = await fetch(`${wecodeart.restUrl}/manage_cookies`, {
                method: 'GET'
            });

            const data = await response.json();

            setCookies(data);
        }

        fetchCookies();
    }, []);

    if (cookies === false) {
        return (
            <Placeholder instructions={__('Loading cookies...', 'wecodeart')} />
        );
    }

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th>{__('Cookie name', 'wecodeart')}</th>
                        <th>{__('Description', 'wecodeart')}</th>
                        <th>{__('Duration', 'wecodeart')}</th>
                        <th>{__('Category', 'wecodeart')}</th>
                        <th style={{
                            width: '1px',
                            whiteSpace: 'nowrap'
                        }}>{__('Actions', 'wecodeart')}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(cookies).length ? Object.keys(cookies).map(key => {
                        const { name, description, duration = '-', category } = cookies[key];

                        return (
                            <tr key={key}>
                                <td>{name ?? key}</td>
                                <td>{description}</td>
                                <td>{duration}</td>
                                <td>{categories?.[category] ? categories[category] : '-'}</td>
                                <td>
                                    {name ? <ButtonGroup style={{ display: 'flex' }}>
                                        <Button variant="secondary" isSmall onClick={() => {
                                            setIsOpen(true);
                                            setCurrentCookie(cookies[key]);
                                        }}><Dashicon icon="edit" /></Button>
                                        <Button variant="secondary" isDestructive isSmall disabled={doingAjax} onClick={async () => {
                                            setDoingAjax(true);

                                            const formData = new FormData();
                                            formData.set('name', name);
                                            formData.set('remove', true);

                                            const response = await fetch(`${wecodeart.restUrl}/manage_cookies`, {
                                                method: 'POST',
                                                body: formData
                                            });

                                            const data = await response.json();

                                            setCookies(data);
                                            setDoingAjax(false);

                                            createNotice('success', sprintf(__('Cookie "%s" has been removed.', 'wecodeart'), name));
                                        }}><Dashicon icon="trash" /></Button>
                                    </ButtonGroup> :
                                        <Tooltip text={__('This cookie is added via API - it cannot be modified.', 'wecodeart')}>
                                            <Dashicon icon="lock" />
                                        </Tooltip>}
                                </td>
                            </tr>
                        );
                    }) : <tr style={{ textAlign: 'center' }}>
                        <td colSpan={5}>{__('No cookies added yet - please add some using the button bellow.', 'am2')}</td>
                    </tr>}
                </tbody>
            </table>
            <Button className="button" onClick={() => setIsOpen(true)}>{__('Add cookies', 'wecodeart')}</Button>
            {isOpen && <ManageCookie {...{ formData, setFormData, createNotice, currentCookie, setCookies }} closeModal={() => {
                setIsOpen(false);
                setCurrentCookie(null);
            }} />}
        </>
    );
};

export default CookiesTable;