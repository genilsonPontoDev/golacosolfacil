
import { getCampaign } from './mock.js';
const data=getCampaign();
document.querySelectorAll('[data-campaign-valid]').forEach(e=>e.textContent=data.valid);
const grid=document.querySelector('.ui-numbers');
if(grid){data.numbers.forEach(n=>{const d=document.createElement('div');d.className='ui-number';d.textContent=n;grid.appendChild(d);});}
