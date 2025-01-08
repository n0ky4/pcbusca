import { EventEmitter } from 'events'

const streams = [
    {
        store: 'kabum',
        data: {
            meta: {
                store: 'kabum',
                query: 'rtx 3060',
                items: 2010,
                pages: 201,
                page: 1,
                pageLimit: 10,
            },
            products: [
                {
                    id: '580364',
                    name: 'Placa de Video RTX 3060 Palit NVIDIA GeForce, 12GB GDDR6, RGB, DLSS, G-Sync, Ray Tracing - NE63060019K9-190AD',
                    cash: { total_price: 1999.99, discount: 15 },
                    installment: {
                        total_price: 2352.93,
                        max_installments: 10,
                        installment_price: 235.29,
                    },
                    stock: 30,
                    url: 'https://www.kabum.com.br/produto/580364',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/580364/placa-de-video-rtx-3060-palit-nvidia-geforce-12gb-gdrrr6-rgb-dlss-g-sync-ray-tracing-ne63060019k9-190ad_1716478999_original.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/580364/placa-de-video-rtx-3060-palit-nvidia-geforce-12gb-gdrrr6-rgb-dlss-g-sync-ray-tracing-ne63060019k9-190ad_1716478999_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/580364/placa-de-video-rtx-3060-palit-nvidia-geforce-12gb-gdrrr6-rgb-dlss-g-sync-ray-tracing-ne63060019k9-190ad_1716478999_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/580364/placa-de-video-rtx-3060-palit-nvidia-geforce-12gb-gdrrr6-rgb-dlss-g-sync-ray-tracing-ne63060019k9-190ad_1716478999_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/580364/placa-de-video-rtx-3060-palit-nvidia-geforce-12gb-gdrrr6-rgb-dlss-g-sync-ray-tracing-ne63060019k9-190ad_1716478999_gg.jpg',
                    },
                },
                {
                    id: '384627',
                    name: 'Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce,  12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC',
                    cash: { total_price: 2299.99, discount: 10 },
                    installment: {
                        total_price: 2555.54,
                        max_installments: 10,
                        installment_price: 255.55,
                    },
                    stock: 7,
                    url: 'https://www.kabum.com.br/produto/384627',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_original.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/384627/placa-de-video-msi-nvidia-geforce-rtx-3060-ventus-2x-12gb-gddr6-dlss-ray-tracing-912-v397-272_1663850312_gg.jpg',
                    },
                },
                {
                    id: '185626',
                    name: 'Placa de Vídeo RTX 3060 Gainward NVIDIA GeForce, Ghost 190AU, 12GB, GDDR6, 192 Bits, Dual FAN - NE63060019K9',
                    cash: { total_price: 1971, discount: 10 },
                    installment: {
                        total_price: 2190,
                        max_installments: 10,
                        installment_price: 219,
                    },
                    stock: 1,
                    url: 'https://www.kabum.com.br/produto/185626',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/sync_mirakl/185626/Placa-de-V-deo-RTX-3060-Gainward-NVIDIA-GeForce-Ghost-190AU-12GB-GDDR6-192-Bits-Dual-FAN-NE63060019K9_1729004661_gg.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/185626/Placa-de-V-deo-RTX-3060-Gainward-NVIDIA-GeForce-Ghost-190AU-12GB-GDDR6-192-Bits-Dual-FAN-NE63060019K9_1729004669_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/185626/Placa-de-V-deo-RTX-3060-Gainward-NVIDIA-GeForce-Ghost-190AU-12GB-GDDR6-192-Bits-Dual-FAN-NE63060019K9_1729004667_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/185626/Placa-de-V-deo-RTX-3060-Gainward-NVIDIA-GeForce-Ghost-190AU-12GB-GDDR6-192-Bits-Dual-FAN-NE63060019K9_1729004665_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/185626/Placa-de-V-deo-RTX-3060-Gainward-NVIDIA-GeForce-Ghost-190AU-12GB-GDDR6-192-Bits-Dual-FAN-NE63060019K9_1729004661_gg.jpg',
                    },
                },
                {
                    id: '150657',
                    name: 'Placa de Vídeo RTX 3060 1-Click OC Galax NVIDIA GeForce, 12GB GDDR6, LHR, DLSS, Ray Tracing - 36NOL7MD1VOC',
                    cash: { total_price: 2099.99, discount: 15 },
                    installment: {
                        total_price: 2470.58,
                        max_installments: 10,
                        installment_price: 247.05,
                    },
                    stock: 1,
                    url: 'https://www.kabum.com.br/produto/150657',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/150657/placa-de-video-galax-geforce-rtx-3060-1-click-oc-15-gbps-12gb-gddr6-ray-tracing-dlss-36nol7md1voc_1614253646_original.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/150657/placa-de-video-galax-geforce-rtx-3060-1-click-oc-15-gbps-12gb-gddr6-ray-tracing-dlss-36nol7md1voc_1614253646_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/150657/placa-de-video-galax-geforce-rtx-3060-1-click-oc-15-gbps-12gb-gddr6-ray-tracing-dlss-36nol7md1voc_1614253646_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/150657/placa-de-video-galax-geforce-rtx-3060-1-click-oc-15-gbps-12gb-gddr6-ray-tracing-dlss-36nol7md1voc_1614253646_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/150657/placa-de-video-galax-geforce-rtx-3060-1-click-oc-15-gbps-12gb-gddr6-ray-tracing-dlss-36nol7md1voc_1614253646_gg.jpg',
                    },
                },
                {
                    id: '174762',
                    name: 'Placa de Vídeo Galax NVIDIA GeForce RTX 3060, 12GB GDDR6, LHR, 1-Click OC, 15GBps, Ray Tracing, DLSS - 36NOL7MD1VOC',
                    cash: { total_price: 2561.51, discount: 0 },
                    installment: {
                        total_price: 2561.51,
                        max_installments: 10,
                        installment_price: 209.99,
                    },
                    stock: 83,
                    url: 'https://www.kabum.com.br/produto/174762',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/sync_mirakl/174762/Placa-de-V-deo-Galax-NVIDIA-GeForce-RTX-3060-12GB-GDDR6-LHR-1-Click-OC-15GBps-Ray-Tracing-DLSS-36NOL7MD1VOC_1729177018_gg.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/174762/Placa-de-V-deo-Galax-NVIDIA-GeForce-RTX-3060-12GB-GDDR6-LHR-1-Click-OC-15GBps-Ray-Tracing-DLSS-36NOL7MD1VOC_1729177024_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/174762/Placa-de-V-deo-Galax-NVIDIA-GeForce-RTX-3060-12GB-GDDR6-LHR-1-Click-OC-15GBps-Ray-Tracing-DLSS-36NOL7MD1VOC_1729177022_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/174762/Placa-de-V-deo-Galax-NVIDIA-GeForce-RTX-3060-12GB-GDDR6-LHR-1-Click-OC-15GBps-Ray-Tracing-DLSS-36NOL7MD1VOC_1729177020_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/174762/Placa-de-V-deo-Galax-NVIDIA-GeForce-RTX-3060-12GB-GDDR6-LHR-1-Click-OC-15GBps-Ray-Tracing-DLSS-36NOL7MD1VOC_1729177018_gg.jpg',
                    },
                },
                {
                    id: '521362',
                    name: 'PC Gamer Neologic AMD Ryzen 5-5500, 16GB RAM, RTX 3060 12GB, SSD 480GB M.2, 600W 80 Plus - Nli86302',
                    cash: { total_price: 5806.44, discount: 0 },
                    installment: {
                        total_price: 5806.44,
                        max_installments: 10,
                        installment_price: 528.99,
                    },
                    stock: 9989,
                    url: 'https://www.kabum.com.br/produto/521362',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/sync_mirakl/521362/PC-Gamer-Neologic-AMD-Ryzen-5-5500-16GB-RAM-RTX-3060-12GB-SSD-480GB-M-2-600W-80-Plus-Nli86302_1727985386_gg.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/521362/PC-Gamer-Neologic-AMD-Ryzen-5-5500-16GB-RAM-RTX-3060-12GB-SSD-480GB-M-2-600W-80-Plus-Nli86302_1727985393_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/521362/PC-Gamer-Neologic-AMD-Ryzen-5-5500-16GB-RAM-RTX-3060-12GB-SSD-480GB-M-2-600W-80-Plus-Nli86302_1727985391_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/521362/PC-Gamer-Neologic-AMD-Ryzen-5-5500-16GB-RAM-RTX-3060-12GB-SSD-480GB-M-2-600W-80-Plus-Nli86302_1727985388_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/521362/PC-Gamer-Neologic-AMD-Ryzen-5-5500-16GB-RAM-RTX-3060-12GB-SSD-480GB-M-2-600W-80-Plus-Nli86302_1727985386_gg.jpg',
                    },
                },
                {
                    id: '396074',
                    name: 'Placa de Vídeo MSI NVIDIA GeForce RTX 3060 Ventus 2X, 12GB OC GDDR6, 192 Bits - 912-V397-272',
                    cash: { total_price: 2471.9, discount: 0 },
                    installment: {
                        total_price: 2471.9,
                        max_installments: 10,
                        installment_price: 237.3,
                    },
                    stock: 196,
                    url: 'https://www.kabum.com.br/produto/396074',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/sync_mirakl/396074/Placa-de-V-deo-MSI-NVIDIA-GeForce-RTX-3060-Ventus-2X-12GB-OC-GDDR6-192-Bits-912-V397-272_1728076555_gg.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/396074/Placa-de-V-deo-MSI-NVIDIA-GeForce-RTX-3060-Ventus-2X-12GB-OC-GDDR6-192-Bits-912-V397-272_1728076570_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/396074/Placa-de-V-deo-MSI-NVIDIA-GeForce-RTX-3060-Ventus-2X-12GB-OC-GDDR6-192-Bits-912-V397-272_1728076567_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/396074/Placa-de-V-deo-MSI-NVIDIA-GeForce-RTX-3060-Ventus-2X-12GB-OC-GDDR6-192-Bits-912-V397-272_1728076564_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/396074/Placa-de-V-deo-MSI-NVIDIA-GeForce-RTX-3060-Ventus-2X-12GB-OC-GDDR6-192-Bits-912-V397-272_1728076555_gg.jpg',
                    },
                },
                {
                    id: '544058',
                    name: 'Placa De Vídeo RTX 3060 Zotac Nvidia Geforce, 12GB, GDDR6, 192 Bits - A30600p-10m',
                    cash: { total_price: 2218.41, discount: 15 },
                    installment: {
                        total_price: 2609.89,
                        max_installments: 10,
                        installment_price: 260.98,
                    },
                    stock: 43,
                    url: 'https://www.kabum.com.br/produto/544058',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/sync_mirakl/544058/Placa-De-V-deo-RTX-3060-Zotac-Nvidia-Geforce-12GB-GDDR6-192-Bits-A30600p-10m_1731687877_gg.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/544058/Placa-De-V-deo-RTX-3060-Zotac-Nvidia-Geforce-12GB-GDDR6-192-Bits-A30600p-10m_1731687883_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/544058/Placa-De-V-deo-RTX-3060-Zotac-Nvidia-Geforce-12GB-GDDR6-192-Bits-A30600p-10m_1731687881_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/544058/Placa-De-V-deo-RTX-3060-Zotac-Nvidia-Geforce-12GB-GDDR6-192-Bits-A30600p-10m_1731687879_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/544058/Placa-De-V-deo-RTX-3060-Zotac-Nvidia-Geforce-12GB-GDDR6-192-Bits-A30600p-10m_1731687877_gg.jpg',
                    },
                },
                {
                    id: '636135',
                    name: 'Placa de Vídeo Colorful GeForce RTX 3060 NB DUO 12G V2 LV',
                    cash: { total_price: 1999.99, discount: 10 },
                    installment: {
                        total_price: 2222.21,
                        max_installments: 10,
                        installment_price: 211.11,
                    },
                    stock: 187,
                    url: 'https://www.kabum.com.br/produto/636135',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/636135/placa-de-video-colorful-geforce-rtx-3060-nb-duo-12g-v2-lv-colorida_1733839035_original.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/636135/placa-de-video-colorful-geforce-rtx-3060-nb-duo-12g-v2-lv-colorida_1733839035_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/636135/placa-de-video-colorful-geforce-rtx-3060-nb-duo-12g-v2-lv-colorida_1733839035_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/636135/placa-de-video-colorful-geforce-rtx-3060-nb-duo-12g-v2-lv-colorida_1733839035_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/636135/placa-de-video-colorful-geforce-rtx-3060-nb-duo-12g-v2-lv-colorida_1733839035_gg.jpg',
                    },
                },
                {
                    id: '469132',
                    name: 'Placa de Vídeo RTX 4060 VENTUS 2x Black OC MSI NVIDIA GeForce, 8GB GDDR6, DLSS, Ray Tracing',
                    cash: { total_price: 2299.99, discount: 14 },
                    installment: {
                        total_price: 2674.41,
                        max_installments: 10,
                        installment_price: 267.44,
                    },
                    stock: 476,
                    url: 'https://www.kabum.com.br/produto/469132',
                    images: {
                        default:
                            'https://images.kabum.com.br/produtos/fotos/469132/placa-de-video-rtx-4060-ventus-2x-black-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing_1688052210_original.jpg',
                        sm: 'https://images.kabum.com.br/produtos/fotos/469132/placa-de-video-rtx-4060-ventus-2x-black-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing_1688052210_p.jpg',
                        md: 'https://images.kabum.com.br/produtos/fotos/469132/placa-de-video-rtx-4060-ventus-2x-black-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing_1688052210_m.jpg',
                        lg: 'https://images.kabum.com.br/produtos/fotos/469132/placa-de-video-rtx-4060-ventus-2x-black-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing_1688052210_g.jpg',
                        xl: 'https://images.kabum.com.br/produtos/fotos/469132/placa-de-video-rtx-4060-ventus-2x-black-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing_1688052210_gg.jpg',
                    },
                },
            ],
        },
    },
    {
        store: 'terabyte',
        data: {
            meta: {
                store: 'terabyte',
                query: 'rtx 3060',
                page: 1,
                pages: null,
                pageLimit: null,
                items: 56,
            },
            products: [
                {
                    id: '30016',
                    name: 'PC Gamer T-GAMER Flux AMD Ryzen 5 5500 / GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 512GB',
                    cash: { discount: 15, total_price: 4137.99 },
                    installment: {
                        installment_price: 405.69,
                        max_installments: 12,
                        total_price: 4868.28,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/30016/pc-gamer-t-gamer-flux-amd-ryzen-5-5500-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-512gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-flux-amd-ryzen-5-5500-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-512gb_223178.jpg',
                    },
                },
                {
                    id: '21366',
                    name: 'Placa de Vídeo MSI NVIDIA GeForce RTX 3060 VENTUS 3X 12G OC Triple Fan, LHR, 12GB, GDDR6, DLSS, Ray Tracing',
                    cash: { discount: 15, total_price: 2099.9 },
                    installment: {
                        installment_price: 205.87,
                        max_installments: 12,
                        total_price: 2470.44,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/21366/placa-de-video-msi-geforce-rtx-3060-ventus-3x-12g-oc-lhr-12gb-gddr6-dlss-ray-tracing',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/placa-de-video-msi-geforce-rtx-3060-ventus-3x-12g-oc-lhr-12gb-gddr6-dlss-ray-tracing_142183.jpg',
                    },
                },
                {
                    id: '17611',
                    name: 'Placa de Vídeo Palit NVIDIA GeForce RTX 3060 Dual, LHR, 12GB, GDDR6, DLSS, Ray Tracing, NE63060019K9-190AD',
                    cash: { discount: 15, total_price: 1999.9 },
                    installment: {
                        installment_price: 196.07,
                        max_installments: 12,
                        total_price: 2352.84,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/17611/placa-de-video-palit-nvidia-geforce-rtx-3060-dual-12gb-gddr6-192bit-ne63060019k9-190ad',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/placa-de-video-palit-nvidia-geforce-rtx-3060-dual-12gb-gddr6-192bit-ne63060019k9-190ad_119583.png',
                    },
                },
                {
                    id: '25623',
                    name: 'Placa de Vídeo SuperFrame NVIDIA GeForce RTX 3060 EPIC 2X, 12GB, GDDR6, DLSS, Ray Tracing',
                    cash: { discount: 15, total_price: 2049.9 },
                    installment: {
                        installment_price: 200.97,
                        max_installments: 12,
                        total_price: 2411.64,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25623/placa-de-video-superframe-epic-2x-nvidia-geforce-rtx-3060-12gb-gddr6-dlss-ray-tracing',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/placa-de-video-superframe-epic-2x-nvidia-geforce-rtx-3060-12gb-gddr6-dlss-ray-tracing_175489.jpg',
                    },
                },
                {
                    id: '26174',
                    name: 'PC Gamer T-GAMER FrameMaster AMD Ryzen 5 5600X / NVIDIA GeForce RTX 3060 / 16GB (2X8GB) DDR4 / SSD 480GB',
                    cash: { discount: 15, total_price: 5354.9 },
                    installment: {
                        installment_price: 524.99,
                        max_installments: 12,
                        total_price: 6299.88,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26174/pc-gamer-t-gamer-framemaster-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-framemaster-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-480gb_223094.jpg',
                    },
                },
                {
                    id: '25414',
                    name: 'PC Gamer T-GAMER FPS AMD Ryzen 5 5600X / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5378.9 },
                    installment: {
                        installment_price: 527.34,
                        max_installments: 12,
                        total_price: 6328.08,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25414/pc-gamer-t-gamer-fps-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-fps-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_223087.jpg',
                    },
                },
                {
                    id: '21422',
                    name: 'PC Gamer T-GAMER Vector Ryzen 5 4600G / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 4019.9 },
                    installment: {
                        installment_price: 394.11,
                        max_installments: 12,
                        total_price: 4729.32,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/21422/pc-gamer-t-gamer-vector-ryzen-5-4600g-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-vector-ryzen-5-4600g-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb_223218.jpg',
                    },
                },
                {
                    id: '19827',
                    name: 'PC Gamer do Ano 2024 Ryzen 5 5600X /  NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 480GB',
                    cash: { discount: 15, total_price: 5214.9 },
                    installment: {
                        installment_price: 511.27,
                        max_installments: 12,
                        total_price: 6135.24,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/19827/pc-gamer-do-ano-2024-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-do-ano-2024-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-480gb_223066.jpg',
                    },
                },
                {
                    id: '25376',
                    name: 'PC Gamer T-GAMER Worthy AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5159.9 },
                    installment: {
                        installment_price: 505.87,
                        max_installments: 12,
                        total_price: 6070.44,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25376/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_222660.jpg',
                    },
                },
                {
                    id: '23701',
                    name: 'Pc Gamer T-GAMER Tera Builds AMD Ryzen 5 4600G / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 480GB',
                    cash: { discount: 15, total_price: 4358.9 },
                    installment: {
                        installment_price: 427.34,
                        max_installments: 12,
                        total_price: 5128.08,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/23701/pc-gamer-t-gamer-tera-builds-amd-ryzen-5-4600g-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-tera-builds-amd-ryzen-5-4600g-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-480gb_222144.jpg',
                    },
                },
                {
                    id: '25666',
                    name: 'PC Gamer T-GAMER Worthy AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 500GB',
                    cash: { discount: 15, total_price: 5219.9 },
                    installment: {
                        installment_price: 511.76,
                        max_installments: 12,
                        total_price: 6141.12,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25666/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-500gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-500gb_223228.jpg',
                    },
                },
                {
                    id: '20662',
                    name: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800XT / NVIDIA GeForce RTX 3060 / 16GB DDR4 / SSD 1TB',
                    cash: { discount: 15, total_price: 5927.99 },
                    installment: {
                        installment_price: 581.18,
                        max_installments: 12,
                        total_price: 6974.16,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20662/pc-gamer-t-gamer-poseidon-amd-ryzen-7-5800xt-nvidia-geforce-rtx-3060-16gb-ddr4-ssd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-poseidon-amd-ryzen-7-5800xt-nvidia-geforce-rtx-3060-16gb-ddr4-ssd-1tb_222645.jpg',
                    },
                },
                {
                    id: '29819',
                    name: 'PC Gamer SORTEIO Match Day AMD Ryzen 5 5600 / GeForce RTX 3060 / 16GB (2x8GB) / SSD NVMe 500GB',
                    cash: { discount: 15, total_price: 5219.9 },
                    installment: {
                        installment_price: 511.76,
                        max_installments: 12,
                        total_price: 6141.12,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/29819/pc-gamer-sorteio-match-day-amd-ryzen-5-5600-geforce-rtx-3060-16gb-2x8gb-ssd-nvme-500gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-sorteio-match-day-amd-ryzen-5-5600-geforce-rtx-3060-16gb-2x8gb-ssd-nvme-500gb_223122.jpg',
                    },
                },
                {
                    id: '19818',
                    name: 'PC Gamer Custo Benefício 2024 Ryzen 5 5600X /  NVIDIA GeForce RTX 3060 / 16GB(2x8) DDR4 / SSD 480GB',
                    cash: { discount: 15, total_price: 5014.9 },
                    installment: {
                        installment_price: 491.66,
                        max_installments: 12,
                        total_price: 5899.92,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/19818/pc-gamer-custo-beneficio-2024-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb2x8-ddr4-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-custo-beneficio-2024-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb2x8-ddr4-ssd-480gb_223065.jpg',
                    },
                },
                {
                    id: '25471',
                    name: 'PC Gamer T-GAMER Open World AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5219.9 },
                    installment: {
                        installment_price: 511.76,
                        max_installments: 12,
                        total_price: 6141.12,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25471/pc-gamer-t-gamer-open-world-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-open-world-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_222662.jpg',
                    },
                },
                {
                    id: '26471',
                    name: 'PC Gamer SuperFrame Master AMD Ryzen 5 5500 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 250GB',
                    cash: { discount: 15, total_price: 4618.9 },
                    installment: {
                        installment_price: 452.83,
                        max_installments: 12,
                        total_price: 5433.96,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26471/pc-gamer-superframe-master-amd-ryzen-5-5500-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-250gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-superframe-master-amd-ryzen-5-5500-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-250gb_222668.jpg',
                    },
                },
                {
                    id: '30260',
                    name: 'PC Gamer T-GAMER Vortex AMD Ryzen 5 5600 / GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 500GB',
                    cash: { discount: 15, total_price: 4519.9 },
                    installment: {
                        installment_price: 443.13,
                        max_installments: 12,
                        total_price: 5317.56,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/30260/pc-gamer-t-gamer-vortex-amd-ryzen-5-5600-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-500gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-vortex-amd-ryzen-5-5600-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-500gb_223283.jpg',
                    },
                },
                {
                    id: '20843',
                    name: 'PC Gamer Custo & Benefício do Ano 2024 AMD Ryzen 5 5600X /  NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 512GB',
                    cash: { discount: 15, total_price: 5199.9 },
                    installment: {
                        installment_price: 509.79,
                        max_installments: 12,
                        total_price: 6117.48,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20843/pc-gamer-custo-beneficio-do-ano-2024-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-512gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-custo-beneficio-do-ano-2024-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-512gb_219794.jpg',
                    },
                },
                {
                    id: '26066',
                    name: 'PC Gamer T-GAMER FrameMaster AMD Ryzen 5 5600X / NVIDIA GeForce RTX 3060 / 16GB (2X8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5378.9 },
                    installment: {
                        installment_price: 527.34,
                        max_installments: 12,
                        total_price: 6328.08,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26066/pc-gamer-t-gamer-framemaster-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-framemaster-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_223093.jpg',
                    },
                },
                {
                    id: '20646',
                    name: 'PC Gamer T-GAMER FrameMaster AMD Ryzen 5 5600X / NVIDIA GeForce RTX 3060 / 16GB DDR4 / SSD 250GB',
                    cash: { discount: 15, total_price: 5339.9 },
                    installment: {
                        installment_price: 523.52,
                        max_installments: 12,
                        total_price: 6282.24,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20646/pc-gamer-t-gamer-framemaster-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-ddr4-ssd-250gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-framemaster-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-ddr4-ssd-250gb_222388.jpg',
                    },
                },
                {
                    id: '28829',
                    name: 'PC Gamer T-GAMER Chajki AMD Ryzen 5 8600G / GeForce RTX 3060 / 16GB DDR5 / SSD 1TB',
                    cash: { discount: 15, total_price: 5756.3 },
                    installment: {
                        installment_price: 564.34,
                        max_installments: 12,
                        total_price: 6772.08,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/28829/pc-gamer-t-gamer-chajki-amd-ryzen-5-8600g-geforce-rtx-3060-16gb-ddr5-ssd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-chajki-amd-ryzen-5-8600g-geforce-rtx-3060-16gb-ddr5-ssd-1tb_223272.jpg',
                    },
                },
                {
                    id: '21029',
                    name: 'PC Gamer T-GAMER Emperor AMD Ryzen 7 5800XT / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 5634.3 },
                    installment: {
                        installment_price: 552.38,
                        max_installments: 12,
                        total_price: 6628.56,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/21029/pc-gamer-t-gamer-emperor-amd-ryzen-7-5800xt-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-emperor-amd-ryzen-7-5800xt-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb_223076.jpg',
                    },
                },
                {
                    id: '29220',
                    name: 'Setup Gamer Odisseia AMD Ryzen 5 5600, RTX 3060, 16GB, SSD 500GB , Monitor 27, Mouse Gamer, Teclado, Headset Gamer',
                    cash: { discount: 15, total_price: 6510.89 },
                    installment: {
                        installment_price: 638.32,
                        max_installments: 12,
                        total_price: 7659.84,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/29220/setup-gamer-odisseia-amd-ryzen-5-5600-rtx-3060-16gb-ssd-500gb-monitor-27-mouse-gamer-teclado-headset-gamer',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/setup-gamer-odisseia-amd-ryzen-5-5600-rtx-3060-16gb-ssd-500gb-monitor-27-mouse-gamer-teclado-headset-gamer_222802.jpg',
                    },
                },
                {
                    id: '20918',
                    name: 'PC Gamer T-Gamer Flame AMD Ryzen 7 5700X / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 5675.2 },
                    installment: {
                        installment_price: 556.39,
                        max_installments: 12,
                        total_price: 6676.68,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20918/pc-gamer-t-gamer-flame-amd-ryzen-7-5700x-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-flame-amd-ryzen-7-5700x-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb_223075.jpg',
                    },
                },
                {
                    id: '30132',
                    name: 'PC Gamer T-GAMER Penon AMD Ryzen 5 8500G / Geforce RTX 3060 / 16GB DDR5 / SSD 480GB / HD 1TB',
                    cash: { discount: 15, total_price: 5104.4 },
                    installment: {
                        installment_price: 500.43,
                        max_installments: 12,
                        total_price: 6005.16,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/30132/pc-gamer-t-gamer-penon-amd-ryzen-5-8500g-geforce-rtx-3060-16gb-ddr5-ssd-480gb-hd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-penon-amd-ryzen-5-8500g-geforce-rtx-3060-16gb-ddr5-ssd-480gb-hd-1tb_219695.jpg',
                    },
                },
                {
                    id: '26000',
                    name: 'PC Gamer T-GAMER Worthy AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 2TB',
                    cash: { discount: 15, total_price: 5612.11 },
                    installment: {
                        installment_price: 550.21,
                        max_installments: 12,
                        total_price: 6602.52,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26000/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-2tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-2tb_222718.jpg',
                    },
                },
                {
                    id: '18201',
                    name: 'PC Gamer T-GAMER Kreator Ryzen 7 5800XT / NVIDIA GeForce RTX 3060 / 32GB DDR4 / SSD 2TB',
                    cash: { discount: 15, total_price: 7217.1 },
                    installment: {
                        installment_price: 707.56,
                        max_installments: 12,
                        total_price: 8490.72,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/18201/pc-gamer-t-gamer-kreator-ryzen-7-5800xt-nvidia-geforce-rtx-3060-32gb-ddr4-ssd-2tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-kreator-ryzen-7-5800xt-nvidia-geforce-rtx-3060-32gb-ddr4-ssd-2tb_223064.jpg',
                    },
                },
                {
                    id: '29800',
                    name: 'PC Gamer T-Gamer Hawk Intel i5 10400F / NVIDIA GeForce RTX 3060 / 16GB DDR4 / SSD 1TB',
                    cash: { discount: 15, total_price: 4626.11 },
                    installment: {
                        installment_price: 453.54,
                        max_installments: 12,
                        total_price: 5442.48,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/29800/pc-gamer-t-gamer-hawk-intel-i5-10400f-nvidia-geforce-rtx-3060-16gb-ddr4-ssd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-hawk-intel-i5-10400f-nvidia-geforce-rtx-3060-16gb-ddr4-ssd-1tb_223676.jpg',
                    },
                },
                {
                    id: '29811',
                    name: 'PC Gamer T-Gamer Barrage Intel i5 12400F / GeForce RTX 3060 / 8GB DDR4 / SSD 480GB',
                    cash: { discount: 15, total_price: 5320.21 },
                    installment: {
                        installment_price: 521.59,
                        max_installments: 12,
                        total_price: 6259.08,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/29811/pc-gamer-t-gamer-barrage-intel-i5-12400f-geforce-rtx-3060-8gb-ddr4-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-barrage-intel-i5-12400f-geforce-rtx-3060-8gb-ddr4-ssd-480gb_223254.jpg',
                    },
                },
                {
                    id: '25662',
                    name: 'PC Gamer T-GAMER Worthy AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 240GB ',
                    cash: { discount: 15, total_price: 4914.11 },
                    installment: {
                        installment_price: 481.78,
                        max_installments: 12,
                        total_price: 5781.36,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25662/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-240gb_222663.jpg',
                    },
                },
                {
                    id: '29810',
                    name: 'PC Gamer T-Gamer Barrage Intel i5 12400F / GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 5094.21 },
                    installment: {
                        installment_price: 499.43,
                        max_installments: 12,
                        total_price: 5993.16,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/29810/pc-gamer-t-gamer-barrage-intel-i5-12400f-geforce-rtx-3060-8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-barrage-intel-i5-12400f-geforce-rtx-3060-8gb-ddr4-ssd-240gb_222690.jpg',
                    },
                },
                {
                    id: '19664',
                    name: 'PC Gamer T-MOBA Eagle Intel i3 10100F / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 3816.2 },
                    installment: {
                        installment_price: 374.14,
                        max_installments: 12,
                        total_price: 4489.68,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/19664/pc-gamer-t-moba-eagle-intel-i3-10100f-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-moba-eagle-intel-i3-10100f-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb_219860.jpg',
                    },
                },
                {
                    id: '28800',
                    name: 'PC Gamer T-GAMER Shakram AMD Ryzen 7 8700G / GeForce RTX 3060 / 32GB DDR5 / SSD 1TB',
                    cash: { discount: 15, total_price: 6488.39 },
                    installment: {
                        installment_price: 636.12,
                        max_installments: 12,
                        total_price: 7633.44,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/28800/pc-gamer-t-gamer-shakram-amd-ryzen-7-8700g-geforce-rtx-3060-32gb-ddr5-ssd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-shakram-amd-ryzen-7-8700g-geforce-rtx-3060-32gb-ddr5-ssd-1tb_223242.jpg',
                    },
                },
                {
                    id: '28823',
                    name: 'PC Gamer T-GAMER Penon AMD Ryzen 5 8500G / GeForce RTX 3060 / 16GB DDR5 / SSD 480GB',
                    cash: { discount: 15, total_price: 4931.3 },
                    installment: {
                        installment_price: 483.46,
                        max_installments: 12,
                        total_price: 5801.52,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/28823/pc-gamer-t-gamer-penon-amd-ryzen-5-8500g-geforce-rtx-3060-16gb-ddr5-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-penon-amd-ryzen-5-8500g-geforce-rtx-3060-16gb-ddr5-ssd-480gb_223265.jpg',
                    },
                },
                {
                    id: '28839',
                    name: 'PC Gamer T-GAMER Worthy AMD Ryzen 5 5600 / GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5220.11 },
                    installment: {
                        installment_price: 511.78,
                        max_installments: 12,
                        total_price: 6141.36,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/28839/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-worthy-amd-ryzen-5-5600-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_222686.jpg',
                    },
                },
                {
                    id: '26466',
                    name: 'PC Gamer SuperFrame Ultra AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 2TB',
                    cash: { discount: 15, total_price: 5164.21 },
                    installment: {
                        installment_price: 506.3,
                        max_installments: 12,
                        total_price: 6075.6,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26466/pc-gamer-superframe-ultra-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-2tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-superframe-ultra-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-2tb_223095.jpg',
                    },
                },
                {
                    id: '28952',
                    name: 'PC Gamer T-GAMER Canopus AMD Ryzen 5 8400F / GeForce RTX 3060 / 16GB DDR5 / SSD 480GB',
                    cash: { discount: 15, total_price: 4855.29 },
                    installment: {
                        installment_price: 476.01,
                        max_installments: 12,
                        total_price: 5712.12,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/28952/pc-gamer-t-gamer-canopus-amd-ryzen-5-8400f-geforce-rtx-3060-16gb-ddr5-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-canopus-amd-ryzen-5-8400f-geforce-rtx-3060-16gb-ddr5-ssd-480gb_222726.jpg',
                    },
                },
                {
                    id: '19688',
                    name: 'PC Gamer T-Gamer Hawk Intel i5 10400F / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 4114.31 },
                    installment: {
                        installment_price: 403.36,
                        max_installments: 12,
                        total_price: 4840.32,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/19688/pc-gamer-t-gamer-hawk-intel-i5-10400f-nvidia-geforce-rtx-3060-ti-ddr4-8gb-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-hawk-intel-i5-10400f-nvidia-geforce-rtx-3060-ti-ddr4-8gb-ssd-240gb_223707.jpg',
                    },
                },
                {
                    id: '17302',
                    name: 'PC Gamer T-GAMER Hawk Intel i5 10400F / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 4154.21 },
                    installment: {
                        installment_price: 407.28,
                        max_installments: 12,
                        total_price: 4887.36,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/17302/pc-gamer-t-gamer-hawk-intel-i5-10400f-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-hawk-intel-i5-10400f-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb_217174.jpg',
                    },
                },
                {
                    id: '20686',
                    name: 'PC Gamer T-Gamer Raptor Intel i5 10400F / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 1TB',
                    cash: { discount: 15, total_price: 4284.3 },
                    installment: {
                        installment_price: 420.03,
                        max_installments: 12,
                        total_price: 5040.36,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20686/pc-gamer-t-gamer-raptor-intel-i5-10400f-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-raptor-intel-i5-10400f-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-1tb_223652.jpg',
                    },
                },
                {
                    id: '26665',
                    name: 'PC Yoda "ÉoQ!" Intel i5 10400F / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 4619.21 },
                    installment: {
                        installment_price: 452.86,
                        max_installments: 12,
                        total_price: 5434.32,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26665/pc-yoda-eoq-intel-i5-10400f-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-yoda-eoq-intel-i5-10400f-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_223664.jpg',
                    },
                },
                {
                    id: '25143',
                    name: 'PC Gamer T-Gamer Flame AMD Ryzen 7 5700X / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 512GB',
                    cash: { discount: 15, total_price: 5900.01 },
                    installment: {
                        installment_price: 578.43,
                        max_installments: 12,
                        total_price: 6941.16,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25143/pc-gamer-t-gamer-flame-amd-ryzen-7-5700x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-512gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-flame-amd-ryzen-7-5700x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-512gb_222146.jpg',
                    },
                },
                {
                    id: '22407',
                    name: 'PC Gamer T-GAMER Sage AMD Ryzen 7 7700X / NVIDIA GeForce RTX 3060 / 16GB DDR5 / SSD 240GB',
                    cash: { discount: 15, total_price: 7189.2 },
                    installment: {
                        installment_price: 704.82,
                        max_installments: 12,
                        total_price: 8457.84,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/22407/pc-gamer-t-gamer-sage-amd-ryzen-7-7700x-nvidia-geforce-rtx-3060-16gb-ddr5-ssd-m2-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-sage-amd-ryzen-7-7700x-nvidia-geforce-rtx-3060-16gb-ddr5-ssd-m2-240gb_223716.jpg',
                    },
                },
                {
                    id: '28532',
                    name: 'Setup Gamer Odisseia AMD Ryzen 5 5600, RTX 3060, 16GB, SSD 1TB , Monitor 27" 165Hz, Mouse Gamer, Teclado T-Dagger Bora, Headset Gamer ',
                    cash: { discount: 15, total_price: 5988.7 },
                    installment: {
                        installment_price: 587.13,
                        max_installments: 12,
                        total_price: 7045.56,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/28532/setup-gamer-odisseia-amd-ryzen-5-5600-rtx-3060-16gb-ssd-1tb-monitor-27-165hz-mouse-gamer-teclado-t-dagger-bora-headset-gamer',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/setup-gamer-odisseia-amd-ryzen-5-5600-rtx-3060-16gb-ssd-1tb-monitor-27-165hz-mouse-gamer-teclado-t-dagger-bora-headset-gamer_222803.jpg',
                    },
                },
                {
                    id: '19092',
                    name: 'PC GAMER T-GAMER Executor AMD Ryzen 7 5700G / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 4969.21 },
                    installment: {
                        installment_price: 487.18,
                        max_installments: 12,
                        total_price: 5846.16,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/19092/pc-gamer-t-gamer-executor-amd-ryzen-7-5700g-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-executor-amd-ryzen-7-5700g-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb_223193.jpg',
                    },
                },
                {
                    id: '31190',
                    name: 'PC Gamer T-GAMER Sage AMD Ryzen 5 7600X / Geforce RTX 3060 / 16GB DDR5 / SSD 1TB',
                    cash: { discount: 15, total_price: 6823.93 },
                    installment: {
                        installment_price: 669.01,
                        max_installments: 12,
                        total_price: 8028.12,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/31190/pc-gamer-t-gamer-sage-amd-ryzen-5-7600x-geforce-rtx-3060-16gb-ddr5-ssd-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-sage-amd-ryzen-5-7600x-geforce-rtx-3060-16gb-ddr5-ssd-1tb_223258.png',
                    },
                },
                {
                    id: '20831',
                    name: 'PC Gamer T-GAMER Flux AMD Ryzen 5 5500 / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 3874.22 },
                    installment: {
                        installment_price: 379.83,
                        max_installments: 12,
                        total_price: 4557.96,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20831/pc-gamer-t-gamer-flux-amd-ryzen-5-5500-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-flux-amd-ryzen-5-5500-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb_223209.jpg',
                    },
                },
                {
                    id: '26792',
                    name: 'PC Gamer T-GAMER Pepe Edition AMD Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5285.2 },
                    installment: {
                        installment_price: 518.16,
                        max_installments: 12,
                        total_price: 6217.92,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26792/pc-gamer-t-gamer-pepe-edition-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-pepe-edition-amd-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_223234.jpg',
                    },
                },
                {
                    id: '25462',
                    name: 'PC Gamer T-Gamer Worthy Ryzen 5 5600 / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 2TB',
                    cash: { discount: 15, total_price: 5733.11 },
                    installment: {
                        installment_price: 562.07,
                        max_installments: 12,
                        total_price: 6744.84,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25462/pc-gamer-t-gamer-worthy-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-2tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-worthy-ryzen-5-5600-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-2tb_222661.jpg',
                    },
                },
                {
                    id: '22067',
                    name: 'PC Gamer T-GAMER Spider AMD Ryzen 5 5600X / NVIDIA GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 5190.11 },
                    installment: {
                        installment_price: 508.83,
                        max_installments: 12,
                        total_price: 6105.96,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/22067/pc-gamer-t-gamer-spider-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-spider-amd-ryzen-5-5600x-nvidia-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-240gb_221305.jpg',
                    },
                },
                {
                    id: '20681',
                    name: 'PC Gamer T-MOBA Falcon Intel i3 10100F / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 3798.2 },
                    installment: {
                        installment_price: 372.37,
                        max_installments: 12,
                        total_price: 4468.44,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/20681/pc-gamer-t-moba-falcon-intel-i3-10100f-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-moba-falcon-intel-i3-10100f-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb_219862.jpg',
                    },
                },
                {
                    id: '26793',
                    name: 'PC Gamer T-GAMER Wrangler AMD Ryzen 7 7700 / NVIDIA GeForce RTX 3060 / 16GB DDR5 / SSD 480GB',
                    cash: { discount: 15, total_price: 6436.29 },
                    installment: {
                        installment_price: 631.01,
                        max_installments: 12,
                        total_price: 7572.12,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/26793/pc-gamer-t-gamer-wrangler-amd-ryzen-7-7700-nvidia-geforce-rtx-3060-16gb-ddr5-ssd-480gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-wrangler-amd-ryzen-7-7700-nvidia-geforce-rtx-3060-16gb-ddr5-ssd-480gb_223235.jpg',
                    },
                },
                {
                    id: '25285',
                    name: 'PC Gamer T-GAMER Balrog AMD Ryzen 9 7900X / NVIDIA GeForce RTX 3060 / 32GB DDR5 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 9600.28 },
                    installment: {
                        installment_price: 941.2,
                        max_installments: 12,
                        total_price: 11294.4,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/25285/pc-gamer-t-gamer-balrog-amd-ryzen-9-7900x-nvidia-geforce-rtx-3060-32gb-ddr5-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-balrog-amd-ryzen-9-7900x-nvidia-geforce-rtx-3060-32gb-ddr5-ssd-nvme-1tb_217365.jpg',
                    },
                },
                {
                    id: '22408',
                    name: 'PC Gamer T-GAMER Sage AMD Ryzen 7 7700X / NVIDIA GeForce RTX 3060 / 16GB DDR5 / SSD 240GB',
                    cash: { discount: 15, total_price: 8989.19 },
                    installment: {
                        installment_price: 881.29,
                        max_installments: 12,
                        total_price: 10575.48,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/22408/pc-gamer-t-gamer-sage-amd-ryzen-7-7700x-nvidia-geforce-rtx-3060-16gb-ddr5-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-sage-amd-ryzen-7-7700x-nvidia-geforce-rtx-3060-16gb-ddr5-ssd-240gb_219414.jpg',
                    },
                },
                {
                    id: '19662',
                    name: 'PC Gamer T-MOBA Eagle Intel i3 10100F / NVIDIA GeForce RTX 3060 / 8GB DDR4 / SSD 240GB',
                    cash: { discount: 15, total_price: 3816.2 },
                    installment: {
                        installment_price: 374.14,
                        max_installments: 12,
                        total_price: 4489.68,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/19662/pc-gamer-t-moba-eagle-intel-i3-10100f-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-moba-eagle-intel-i3-10100f-nvidia-geforce-rtx-3060-ddr4-8gb-ssd-240gb_217769.jpg',
                    },
                },
                {
                    id: '27385',
                    name: 'PC Gamer T-Gamer Barrage Intel i5 12400F / GeForce RTX 3060 / 16GB (2x8GB) DDR4 / SSD NVMe 1TB',
                    cash: { discount: 15, total_price: 5790.2 },
                    installment: {
                        installment_price: 567.67,
                        max_installments: 12,
                        total_price: 6812.04,
                    },
                    url: 'https://www.terabyteshop.com.br/produto/27385/pc-gamer-t-gamer-barrage-intel-i5-12400f-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb',
                    images: {
                        default:
                            'https://img.terabyteshop.com.br/produto/p/pc-gamer-t-gamer-barrage-intel-i5-12400f-geforce-rtx-3060-16gb-2x8gb-ddr4-ssd-nvme-1tb_223098.jpg',
                    },
                },
            ],
        },
    },
    {
        store: 'pichau',
        data: {
            meta: {
                store: 'pichau',
                query: 'rtx 3060',
                items: 1259,
                page: 1,
                pages: 126,
                pageLimit: 10,
            },
            products: [
                {
                    id: 'PCM-Mancer-Gamer-31054',
                    name: 'PC Gamer Mancer Befana, Intel i3-10100F, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB',
                    url: 'https://www.pichau.com.br/computador-mancer-gamer-befana-intel-i3-10100f-geforce-rtx-3060-12gb-16gb-ddr4-ssd-480gb-31054',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/a/p/apus-bk-pichau-intel-rtx-001_50.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/a/p/apus-bk-pichau-intel-rtx-001_50.jpg',
                    },
                    cash: { total_price: 3759.98, discount: 15 },
                    installment: {
                        total_price: 4423.5,
                        max_installments: 12,
                        installment_price: 368.63,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-33074',
                    name: ' PC Gamer Pichau, AMD Ryzen 7 5700X, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB',
                    url: 'https://www.pichau.com.br/computador-pichau-gamer-amd-ryzen-7-5700x-geforce-rtx-3060-12gb-16gb-ddr4-ssd-480g-33074',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/h/e/hexar-gtrx-small-amd-001_1_4.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/h/e/hexar-gtrx-small-amd-001_1_4.jpg',
                    },
                    cash: { total_price: 4899.99, discount: 15 },
                    installment: {
                        total_price: 5764.69,
                        max_installments: 12,
                        installment_price: 480.39,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-42159',
                    name: 'PC Gamer Pichau Forseti II, Intel i3-13100F, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB',
                    url: 'https://www.pichau.com.br/computador-pichau-gamer-forseti-ii-intel-i3-13100f-geforce-rtx-3060-12gb-16gb-ddr4-ssd-480gb-42159',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/n/a/narok-mancer-intel-rtx-0001_7_20.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/n/a/narok-mancer-intel-rtx-0001_7_20.jpg',
                    },
                    cash: { total_price: 4199.99, discount: 15 },
                    installment: {
                        total_price: 4941.16,
                        max_installments: 12,
                        installment_price: 411.76,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-33202',
                    name: 'PC Gamer Pichau, Intel i5-12400F, GeForce RTX 3060 12GB, 16GB DDR4, SSD M.2 480GB',
                    url: 'https://www.pichau.com.br/computador-pichau-gamer-intel-i5-12400f-geforce-rtx-3060-12gb-16gb-ddr4-ssd-m-2-480gb-33202',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/a/p/apus-bk-pichau-intel-rtx-001_48.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/a/p/apus-bk-pichau-intel-rtx-001_48.jpg',
                    },
                    cash: { total_price: 4369.99, discount: 15 },
                    installment: {
                        total_price: 5141.16,
                        max_installments: 12,
                        installment_price: 428.43,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-52352',
                    name: 'PC Gamer Pichau Susanowo, AMD Ryzen 5 9600X, GeForce RTX 3060 12GB, 16GB DDR5, SSD 480GB ',
                    url: 'https://www.pichau.com.br/pc-gamer-pichau-susanowo-amd-ryzen-5-9600x-geforce-rtx-3060-12gb-16gb-ddr5-ssd-480gb-52352',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/a/p/apus-black-amd-rx-001_9_15.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/a/p/apus-black-amd-rx-001_9_15.jpg',
                    },
                    cash: { total_price: 6775.78, discount: 15 },
                    installment: {
                        total_price: 7971.51,
                        max_installments: 12,
                        installment_price: 664.29,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-37308',
                    name: 'PC Gamer Pichau Rudra III, AMD Ryzen 5 4500, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB',
                    url: 'https://www.pichau.com.br/computador-pichau-gamer-rudra-iii-amd-ryzen-5-4500-geforce-rtx-3060-12gb-16gb-ddr4-ssd-480gb-37308',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/a/p/apus-rgb-pichau-amd-com-placa-01_8_28.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/a/p/apus-rgb-pichau-amd-com-placa-01_8_28.jpg',
                    },
                    cash: { total_price: 3999, discount: 15 },
                    installment: {
                        total_price: 4704.71,
                        max_installments: 12,
                        installment_price: 392.06,
                    },
                },
                {
                    id: 'PCM-Mancer-Gamer-33326',
                    name: 'PC Gamer Mancer Asterius, AMD Ryzen 7 5800X, GeForce RTX 3060 12GB, 16GB DDR4, SSD M.2 480GB',
                    url: 'https://www.pichau.com.br/computador-mancer-gamer-asterius-amd-ryzen-7-5800x-geforce-rtx-3060-12gb-16gb-ddr4-ssd-m-2-480gb-33326',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/c/o/computador-mancer-gamer-cv-500-preto-001_11.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/c/o/computador-mancer-gamer-cv-500-preto-001_11.jpg',
                    },
                    cash: { total_price: 6639.02, discount: 15 },
                    installment: {
                        total_price: 7810.61,
                        max_installments: 12,
                        installment_price: 650.88,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-38958',
                    name: 'PC Gamer Pichau Zéfiro III, Intel i5-8500, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB',
                    url: 'https://www.pichau.com.br/computador-pichau-gamer-zefiro-iii-intel-i5-8500-geforce-rtx-3060-12gb-16gb-ddr4-ssd-480gb-38958',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/n/a/narok-mancer-intel-rtx-0001_10_11.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/n/a/narok-mancer-intel-rtx-0001_10_11.jpg',
                    },
                    cash: { total_price: 3899.98, discount: 15 },
                    installment: {
                        total_price: 4588.21,
                        max_installments: 12,
                        installment_price: 382.35,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-31303',
                    name: 'PC Gamer Pichau Aura, Intel i5-10400F, GeForce RTX 3060 12GB, 16GB DDR4, SSD 480GB',
                    url: 'https://www.pichau.com.br/computador-pichau-gamer-aura-intel-i5-10400f-geforce-rtx-3060-12gb-16gb-ddr4-ssd-480gb-31303',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/k/o/korgan-k275m-media-bk-pcpichau-001v22_3.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/k/o/korgan-k275m-media-bk-pcpichau-001v22_3.jpg',
                    },
                    cash: { total_price: 5149.65, discount: 15 },
                    installment: {
                        total_price: 6058.41,
                        max_installments: 12,
                        installment_price: 504.87,
                    },
                },
                {
                    id: 'PCM-Pichau-Gamer-51706',
                    name: 'PC Gamer Pichau Fuzhu II, Intel i7-12700F, GeForce RTX 3060 12GB, 16GB DDR4, SSD M.2 480GB',
                    url: 'https://www.pichau.com.br/pc-gamer-pichau-fuzhu-ii-intel-i7-12700f-geforce-rtx-3060-12gb-16gb-ddr4-ssd-m-2-480gb-51706',
                    images: {
                        default:
                            'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/a/p/apus-kit-intel-rtx-gtx-031_3_29.jpg',
                        sm: 'https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/a/p/apus-kit-intel-rtx-gtx-031_3_29.jpg',
                    },
                    cash: { total_price: 6400.83, discount: 15 },
                    installment: {
                        total_price: 7530.39,
                        max_installments: 12,
                        installment_price: 627.53,
                    },
                },
            ],
        },
    },
] as const

type SearchEmitter = EventEmitter & {
    start: () => void
}

export function streamSimulator() {
    const em = new EventEmitter() as SearchEmitter
    let running = false

    // start, data, end, error

    em.start = () => {
        if (running) {
            return
        }

        running = true
        em.emit('start')

        let i = 0
        const interval = setInterval(() => {
            em.emit('data', streams[i])
            i++

            if (i === streams.length) {
                clearInterval(interval)
                running = false
                setTimeout(() => {
                    em.emit('end')
                }, 1)
            }
        }, 2000)
    }

    return em
}
