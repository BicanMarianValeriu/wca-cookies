const {
    i18n: {
        __,
        sprintf
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
        Tooltip,
        Card,
        CardHeader,
        CardBody,
        __experimentalHStack: HStack,
    },
    element: {
        useEffect,
        useState,
        useRef,
        useMemo
    },
} = wp;

const { categories = [] } = wecodeartCookies || {};

const ManageCookie = ({ closeModal, createNotice, currentCookie, setCookies }) => {
    const [data, setData] = useState(currentCookie || { name: '', duration: '', category: '', description: '', blockedPatterns: '' });
    const [doingAjax, setDoingAjax] = useState(null);
    const formRef = useRef(null);

    const handleCookie = async () => {
        setDoingAjax(true);

        const formData = new FormData(formRef.current);
        if (currentCookie) {
            // Add name for editing cookie (as the input is disabled);
            formData.set('name', currentCookie.name);
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
        <Modal title={currentCookie ? sprintf(__('Edit "%s" cookie', 'wecodeart'), currentCookie.name) : __('Add cookie', 'wecodeart')} onRequestClose={closeModal}>
            <form ref={formRef}>
                <TextControl
                    label={__('Cookie name', 'wecodeart')}
                    name="name"
                    value={data.name || ''}
                    disabled={currentCookie}
                    required
                    onChange={(name) => setData({ ...data, name })}
                />
                <TextareaControl
                    label={__('Regex', 'wecodeart')}
                    name="blockedPatterns"
                    help={__('Comma-separated patterns to block (e.g., _ga_*, _hjSession_*). Use * as wildcard.', 'wecodeart')}
                    value={data.blockedPatterns || ''}
                    onChange={(blockedPatterns) => setData({ ...data, blockedPatterns })}
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

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
                {sprintf(__('Showing %1$d-%2$d of %3$d items', 'wecodeart'), startItem, endItem, totalItems)}
            </div>
            <div className="d-flex gap-1">
                <Button
                    variant="secondary"
                    isSmall
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <Dashicon icon="arrow-left-alt2" />
                </Button>
                
                {getPageNumbers().map((page, index) => (
                    <Button
                        key={index}
                        variant={page === currentPage ? "primary" : "secondary"}
                        isSmall
                        disabled={page === '...'}
                        onClick={() => page !== '...' && onPageChange(page)}
                    >
                        {page}
                    </Button>
                ))}
                
                <Button
                    variant="secondary"
                    isSmall
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <Dashicon icon="arrow-right-alt2" />
                </Button>
            </div>
        </div>
    );
};

const CookiesTable = ({ formData, setFormData, cookies, setCookies, createNotice }) => {
    const [currentCookie, setCurrentCookie] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [doingAjax, setDoingAjax] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter and paginate cookies
    const filteredCookies = useMemo(() => {
        if (!cookies || typeof cookies !== 'object') return {};
        
        const filtered = Object.keys(cookies).filter(key => {
            const cookie = cookies[key];
            const searchLower = searchTerm.toLowerCase();
            
            return (
                (cookie.name || key).toLowerCase().includes(searchLower) ||
                (cookie.description || '').toLowerCase().includes(searchLower) ||
                (cookie.category || '').toLowerCase().includes(searchLower) ||
                (categories[cookie.category] || '').toLowerCase().includes(searchLower)
            );
        });
        
        // Sort cookies: non-editable (API cookies) first, then editable cookies
        const sortedKeys = filtered.sort((a, b) => {
            const cookieA = cookies[a];
            const cookieB = cookies[b];
            
            // Non-editable cookies (no name property) come first
            const isEditableA = !!cookieA.name;
            const isEditableB = !!cookieB.name;
            
            if (isEditableA !== isEditableB) {
                return isEditableA ? 1 : -1; // Non-editable first
            }
            
            // If both are same type, sort alphabetically by name
            const nameA = cookieA.name || a;
            const nameB = cookieB.name || b;
            return nameA.toLowerCase().localeCompare(nameB.toLowerCase());
        });
        
        return sortedKeys.reduce((acc, key) => {
            acc[key] = cookies[key];
            return acc;
        }, {});
    }, [cookies, searchTerm]);

    const paginatedCookies = useMemo(() => {
        const keys = Object.keys(filteredCookies);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        return keys.slice(startIndex, endIndex).reduce((acc, key) => {
            acc[key] = filteredCookies[key];
            return acc;
        }, {});
    }, [filteredCookies, currentPage, itemsPerPage]);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (cookies === false) {
        return (
            <Placeholder instructions={__('Loading cookies...', 'wecodeart')} />
        );
    }

    const totalItems = Object.keys(filteredCookies).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            <Card className="border shadow-none h-100">
                <CardHeader>
                    <HStack>
                        <h5 className="text-uppercase fw-medium m-0">{__('Cookies Management', 'wecodeart')}</h5>
                        <Button 
                            className="button" 
                            isPrimary 
                            onClick={() => setIsOpen(true)}
                        >
                            {__('Add cookies', 'wecodeart')}
                        </Button>
                    </HStack>
                </CardHeader>
                <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                    <HStack className="mb-3">
                        <div className="flex-grow-1">
                            <TextControl
                                placeholder={__('Search cookies...', 'wecodeart')}
                                value={searchTerm}
                                onChange={setSearchTerm}
                            />
                        </div>
                        <div style={{ minWidth: '120px' }}>
                            <SelectControl 
                                value={itemsPerPage}
                                options={[
                                    { label: '5', value: 5 },
                                    { label: '10', value: 10 },
                                    { label: '25', value: 25 },
                                    { label: '50', value: 50 }
                                ]}
                                onChange={(value) => {
                                    setItemsPerPage(parseInt(value));
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </HStack>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th>{__('Cookie name', 'wecodeart')}</th>
                                    <th>{__('Description', 'wecodeart')}</th>
                                    <th>{__('Duration', 'wecodeart')}</th>
                                    <th>{__('Category', 'wecodeart')}</th>
                                    <th>{__('Regex', 'wecodeart')}</th>
                                    <th style={{
                                        width: '1px',
                                        whiteSpace: 'nowrap'
                                    }}>{__('Actions', 'wecodeart')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(paginatedCookies).length ? Object.keys(paginatedCookies).map(key => {
                                    const { name, description, duration = '-', category, blockedPatterns } = paginatedCookies[key];
                                    const isSystemCookie = !name; // System cookies don't have a name property

                                    return (
                                        <tr key={key} style={{
                                            backgroundColor: isSystemCookie ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                                            borderLeft: isSystemCookie ? '3px solid #007cba' : 'none'
                                        }}>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    {name || key}
                                                </div>
                                            </td>
                                            <td>{description}</td>
                                            <td>{duration}</td>
                                            <td>{categories && categories[category] ? categories[category] : '-'}</td>
                                            <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blockedPatterns || '-'}</td>
                                            <td>
                                                {name ? <ButtonGroup style={{ display: 'flex' }}>
                                                    <Button variant="secondary" isSmall onClick={() => {
                                                        setIsOpen(true);
                                                        setCurrentCookie(paginatedCookies[key]);
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
                                    <td colSpan={6}>
                                        {searchTerm ? 
                                            sprintf(__('No cookies found matching "%s".', 'wecodeart'), searchTerm) :
                                            __('No cookies added yet - please add some using the button above.', 'wecodeart')
                                        }
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>

                    {totalItems > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                        />
                    )}

                </CardBody>
            </Card>
            {isOpen && <ManageCookie {...{ formData, setFormData, createNotice, currentCookie, setCookies }} closeModal={() => {
                setIsOpen(false);
                setCurrentCookie(null);
            }} />}
        </>
    );
};

export default CookiesTable;