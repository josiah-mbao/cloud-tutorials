// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			// The blog title now reflects your new brand
			title: 'Josiah\'s Open Source School (JOSS)', 
			social: [{ icon: 'github', label: 'GitHub', href: 'YOUR_GITHUB_REPO_URL' }], // IMPORTANT: Update this URL to your actual GitHub repo

			// 👇 This is the updated sidebar configuration 👇
			sidebar: [
				{
					label: 'Start Here',
					link: '/', // Links directly to your index.mdx landing page
				},
				{
					label: '1. Foundations',
					// autogenerate tells Starlight to find all files in the 'foundations' folder
					autogenerate: { directory: 'foundations' }, 
				},
				{
					label: '2. Containers',
					autogenerate: { directory: 'containers' },
				},
				// Add the remaining sections for future content
				{
					label: '3. CI/CD',
					autogenerate: { directory: 'cicd' },
				},
				{
					label: '4. Kubernetes',
					autogenerate: { directory: 'kubernetes' },
				},
			],
			// 👆 End of updated sidebar configuration 👆

		}),
	],
});
