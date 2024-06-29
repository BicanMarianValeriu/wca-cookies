const {
    i18n: {
        __,
    },
    components: {
        Modal,
        Spinner,
        Button,
        TextareaControl,
        ToggleControl,
    },
    element: {
        useRef,
        useState,
    },
} = wp;

const ProgressComponent = ({ progress = 0 }) => {
    return (
        <>
            <div style={{ border: '1px solid lightgrey', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{
                    backgroundColor: 'var(--wp-admin-theme-color)',
                    height: 14,
                    width: `${progress}%`
                }} />
            </div>
        </>
    );
};

const ScanCookies = ({ formData, setFormData, closeModal, createNotice }) => {
    const [progress, setProgress] = useState(0);
    const [scanning, setScanning] = useState(null);
    const [scanType, setScanType] = useState(null);
    const formRef = useRef(null);

    const handleScan = async (page) => {
        const formData = new FormData(formRef.current);
        formData.append('scan', scanType ? 'all' : 'last');
        formData.append('page', page);

        const response = await fetch(`${wecodeart.restUrl}/scan_cookies`, {
            method: 'POST',
            body: formData
        });

        const { cookies = [], progress, next } = await response.json();

        if (next) {
            setProgress(progress);
            await handleScan(next);
        } else {
            setScanning(false);
            setProgress(100);
            const cookiesAmount = Object.values(cookies).flat().length;
            createNotice('success', sprintf(__('%s detected cookie(s) added to list.', 'wecodeart'), cookiesAmount));
        }
    };

    const startScan = async () => {
        setScanning(true);
        setProgress(0);
        await handleScan(1);
    };

    return (
        <Modal title={__('Scan cookies', 'wecodeart')} onRequestClose={closeModal}>
            <form name="wecodeart-cookies-scan" ref={formRef}>
                <div className="components-notice is-warning flex-column align-items-start m-0 mb-3">
                    <ul class="my-0">
                        <li class="mb-0">{__('Scan your website for server-side cookies (set with setcookie).', 'wecodeart')}</li>
                        <li class="mb-0">{__('Note that all cookies will be automatically detected on page load.', 'wecodeart')}</li>
                        {scanType && <li class="mb-0">{__('Scanning all URLs will take significantly longer.', 'wecodeart')}</li>}
                    </ul>
                </div>
                <ToggleControl
                    label={__('Full scan?', 'wecodeart')}
                    name="scan"
                    checked={scanType}
                    onChange={() => setScanType(!scanType)}
                    help={sprintf(
                        __('Scan %s for each post type.', 'wecodeart'),
                        scanType ? __('all urls', 'wecodeart') : __('last url', 'wecodeart')
                    )}
                />
                <TextareaControl
                    label={__('Additional URLs to scan', 'wecodeart')}
                    name="urls"
                    cols="50"
                    value={formData.scan}
                    onChange={scan => setFormData({ ...formData, scan })}
                    help={__('One per line - save settings for future scans.', 'wecodeart')}
                />
                <Button className="button d-flex gap-2" isPrimary icon={scanning && <Spinner style={{ margin: 0 }} />} onClick={startScan} {...{ disabled: scanning }}>
                    {scanning ? __('Scaning cookies', 'wecodeart') : __('Scan cookies', 'wecodeart')}
                </Button>
                {scanning && (<p><ProgressComponent progress={progress} /></p>)}
            </form>
        </Modal>
    );
}

export default ScanCookies;