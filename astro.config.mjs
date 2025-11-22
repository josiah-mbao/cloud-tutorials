// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://josiah-mbao.github.io',
	base: '/cloud-tutorials',
	integrations: [
		starlight({
			// The blog title now reflects your new brand
			title: 'Josiah\'s Open Source School (JOSS)',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/josiah-mbao/cloud-tutorials' }],

			sidebar: [
				{
					label: 'Start Here',
					link: '/', // Links directly to your index.mdx landing page
				},
				{
					label: '1. Foundations',
					autogenerate: { directory: 'foundations' },
				},
				{
					label: '2. Containers',
					autogenerate: { directory: 'containers' },
				},
				{
					label: '3. CI/CD',
					autogenerate: { directory: 'cicd' },
				},
				{
					label: '4. MLOps Fundamentals',
					autogenerate: { directory: 'mlops' },
				},
				{
					label: '5. Kubernetes',
					autogenerate: { directory: 'kubernetes' },
				},
			],
			// 👆 End of updated sidebar configuration 👆

		}),
	],
});
