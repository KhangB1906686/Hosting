const express = require('express');
const { Builder, By, Capabilities } = require('selenium-webdriver');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/open', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const capabilities = Capabilities.chrome();
        capabilities.set('chromeOptions', {
            args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        });

        let driver = await new Builder().forBrowser('chrome').withCapabilities(capabilities).build();
        await driver.get(url);
        res.send('Website opened successfully!');

        // Đóng trình duyệt sau một khoảng thời gian
        setTimeout(() => driver.quit(), 5000);
    } catch (error) {
        res.status(500).send('Error opening website: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});