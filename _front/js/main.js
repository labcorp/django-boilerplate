import '@/css/tailwind.css'
import '@/scss/main.scss';
import lab from './lab';

import Alpine from 'alpinejs'
import mask from '@alpinejs/mask'

Alpine.plugin(mask)

// Utils
import './utils/theme_toggle';
import './utils/uppercase';

// Components
import './components/dropdown';

Alpine.magic('now', () => {
    return (new Date).toLocaleTimeString()
})


window.addEventListener('DOMContentLoaded', lab());
window.Alpine = Alpine
Alpine.start()
