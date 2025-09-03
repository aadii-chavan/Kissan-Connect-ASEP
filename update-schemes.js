document.addEventListener('DOMContentLoaded', function() {
	const authBox = document.getElementById('auth-box');
	const whenOut = document.getElementById('auth-when-logged-out');
	const whenIn = document.getElementById('auth-when-logged-in');
	const userEmail = document.getElementById('user-email');
	const loginEmail = document.getElementById('login-email');
	const loginPassword = document.getElementById('login-password');
	const loginBtn = document.getElementById('login-btn');
	const signupBtn = document.getElementById('signup-btn');
	const logoutBtn = document.getElementById('logout-btn');
	const authMessage = document.getElementById('auth-message');
	const seedBtn = document.getElementById('seed-btn');
	const seedMessage = document.getElementById('seed-message');
	const crudArea = document.getElementById('crud-area');
	const responseMessage = document.getElementById('response-message');
	const schemesList = document.getElementById('schemes-list');

	function showAuthMessage(text, type) {
		authMessage.textContent = text;
		authMessage.className = 'notice ' + (type || '');
	}
	function showRespMessage(text, type) {
		responseMessage.textContent = text;
		responseMessage.className = 'notice ' + (type || '');
	}
	function showSeedMessage(text, type) {
		seedMessage.textContent = text;
		seedMessage.className = 'notice ' + (type || '');
	}

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			whenOut.classList.add('hide');
			whenIn.classList.remove('hide');
			crudArea.classList.remove('hide');
			userEmail.textContent = user.email || '';
			loadSchemes();
		} else {
			whenIn.classList.add('hide');
			crudArea.classList.add('hide');
			whenOut.classList.remove('hide');
		}
	});

	loginBtn.addEventListener('click', async function() {
		showAuthMessage('', '');
		try {
			await firebase.auth().signInWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value);
		} catch (e) {
			showAuthMessage(e.message || 'Login failed', 'error');
		}
	});
	signupBtn.addEventListener('click', async function() {
		showAuthMessage('', '');
		try {
			await firebase.auth().createUserWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value);
			showAuthMessage('Signup successful. You are now logged in.', 'success');
		} catch (e) {
			showAuthMessage(e.message || 'Signup failed', 'error');
		}
	});
	logoutBtn.addEventListener('click', async function() {
		await firebase.auth().signOut();
	});

	async function addScheme(scheme) {
		return window.db.collection('schemes').add({
			scheme_name: scheme.scheme_name,
			description: scheme.description,
			read_more_link: scheme.read_more_link,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		});
	}

	async function deleteScheme(id) {
		return window.db.collection('schemes').doc(id).delete();
	}

	async function loadSchemes() {
		schemesList.innerHTML = '';
		const snap = await window.db.collection('schemes').orderBy('createdAt', 'desc').get();
		if (snap.empty) {
			schemesList.innerHTML = '<div class="item"><div class="meta">No schemes yet.</div></div>';
			return;
		}
		snap.forEach(doc => {
			const d = doc.data();
			const el = document.createElement('div');
			el.className = 'item';
			el.innerHTML = `
				<div class="meta">
					<div style="font-weight:700; color:#0d401c;">${d.scheme_name}</div>
					<div style="font-size:14px;color:#46604a;margin:6px 0;">${d.description}</div>
					<a href="${d.read_more_link}" target="_blank" class="tf-btn bg-white gap-30"><span class="text-style cl-primary">Open Link</span><div class="icon"><i class="icon-arrow_right"></i></div></a>
				</div>
				<button class="btn-danger-kk" data-id="${doc.id}">Delete</button>
			`;
			schemesList.appendChild(el);
		});
	}

	document.getElementById('scheme-form').addEventListener('submit', async function(e) {
		e.preventDefault();
		showRespMessage('', '');
		const scheme = {
			scheme_name: document.getElementById('scheme_name').value.trim(),
			description: document.getElementById('description').value.trim(),
			read_more_link: document.getElementById('read_more_link').value.trim()
		};
		if (!scheme.scheme_name || !scheme.description || !scheme.read_more_link) {
			showRespMessage('Please fill all fields', 'error');
			return;
		}
		try {
			await addScheme(scheme);
			showRespMessage('✅ Scheme added', 'success');
			this.reset();
			loadSchemes();
		} catch (e) {
			showRespMessage('❌ Failed to add scheme', 'error');
		}
	});

	schemesList.addEventListener('click', async function(e) {
		if (e.target && e.target.matches('button.btn-danger-kk')) {
			const id = e.target.getAttribute('data-id');
			if (!confirm('Delete this scheme?')) return;
			try {
				await deleteScheme(id);
				loadSchemes();
			} catch (err) {
				alert('Delete failed');
			}
		}
	});

	seedBtn.addEventListener('click', async function() {
		showSeedMessage('Seeding in progress...', '');
		const list = [
			{ scheme_name: 'PM-KISAN', description: 'Income support to all landholding farmer families in India.', read_more_link: 'https://pmkisan.gov.in/' },
			{ scheme_name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', description: 'Crop insurance scheme for farmers to stabilize income.', read_more_link: 'https://pmfby.gov.in/' },
			{ scheme_name: 'Soil Health Card Scheme', description: 'Provides soil health cards to farmers for balanced fertilization.', read_more_link: 'https://soilhealth.dac.gov.in/' },
			{ scheme_name: 'Paramparagat Krishi Vikas Yojana (PKVY)', description: 'Promotes organic farming through cluster-based approach.', read_more_link: 'https://pgsindia-ncof.gov.in/' },
			{ scheme_name: 'e-NAM', description: 'National Agricultural Market to facilitate trading of agri produce.', read_more_link: 'https://enam.gov.in/' },
			{ scheme_name: 'Kisan Credit Card (KCC)', description: 'Credit support to farmers for cultivation and other needs.', read_more_link: 'https://www.myscheme.gov.in/schemes/kcc' },
			{ scheme_name: 'MIF – Micro Irrigation Fund', description: 'Funds for micro-irrigation projects to enhance water use efficiency.', read_more_link: 'https://www.nabard.org/content1.aspx?id=920&catid=8&mid=530' },
			{ scheme_name: 'PMKSY – Per Drop More Crop', description: 'Improved on-farm water use efficiency and micro-irrigation.', read_more_link: 'https://pmksy.gov.in/' },
			{ scheme_name: 'National Mission on Oilseeds and Oil Palm (NMOOP)', description: 'Enhance production of oilseeds and oil palm.', read_more_link: 'https://nmoop.gov.in/' },
			{ scheme_name: 'Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)', description: 'Holistic development of agriculture and allied sectors.', read_more_link: 'https://rkvy.nic.in/' },
			{ scheme_name: 'National Food Security Mission (NFSM)', description: 'Increase production of rice, wheat, pulses, etc.', read_more_link: 'https://nfsm.gov.in/' },
			{ scheme_name: 'Dairying through Cooperatives', description: 'Support to dairy cooperatives for infrastructure.', read_more_link: 'https://dahd.nic.in/' },
			{ scheme_name: 'National Livestock Mission (NLM)', description: 'Sustainable development of the livestock sector.', read_more_link: 'https://nlm.gov.in/' },
			{ scheme_name: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)', description: 'Support to micro food processing units.', read_more_link: 'https://mofpi.gov.in/pmfme/' },
			{ scheme_name: 'Gramin Bhandaran Yojna', description: 'Rural godowns scheme for scientific storage.', read_more_link: 'https://www.nabard.org/content1.aspx?id=602&catid=23&mid=530' },
			{ scheme_name: 'Agri Infrastructure Fund (AIF)', description: 'Financing for post-harvest management and infrastructure.', read_more_link: 'https://www.aif.gov.in/' },
			{ scheme_name: 'Pradhan Mantri Kisan Maandhan Yojana', description: 'Pension scheme for small and marginal farmers.', read_more_link: 'https://www.pmkmy.gov.in/' },
			{ scheme_name: 'Blue Revolution', description: 'Integrated development and management of fisheries.', read_more_link: 'https://dof.gov.in/' },
			{ scheme_name: 'National Bamboo Mission', description: 'Holistic development of the bamboo sector.', read_more_link: 'https://nbm.nic.in/' },
			{ scheme_name: 'Mission for Integrated Development of Horticulture (MIDH)', description: 'Development of horticulture sector.', read_more_link: 'https://midh.gov.in/' },
			{ scheme_name: 'National Mission on Sustainable Agriculture (NMSA)', description: 'Sustainable agriculture practices under climate change.', read_more_link: 'https://nmsa.dac.gov.in/' },
			{ scheme_name: 'Drought Prone Areas Programme', description: 'Mitigate the adverse effects of drought.', read_more_link: 'https://dolr.gov.in/' },
			{ scheme_name: 'Watershed Development Component (WDC-PMKSY)', description: 'Soil and water conservation via watershed projects.', read_more_link: 'https://dolr.gov.in/' },
			{ scheme_name: 'Sub-Mission on Agricultural Mechanization (SMAM)', description: 'Promote farm mechanization.', read_more_link: 'https://agrimachinery.nic.in/' },
			{ scheme_name: 'National Beekeeping & Honey Mission (NBHM)', description: 'Promote beekeeping for income and crop productivity.', read_more_link: 'https://nbb.gov.in/' },
			{ scheme_name: 'PM Gati Shakti for Agriculture Logistics', description: 'Integrated logistics for agriculture supply chains.', read_more_link: 'https://pmgati.gov.in/' },
			{ scheme_name: 'PM Kisan SAMPADA', description: 'Mega food park, cold chain, and infrastructure.', read_more_link: 'https://mofpi.gov.in/Schemes/sampada' },
			{ scheme_name: 'Atmanirbhar Bharat (Agri Reforms)', description: 'Reforms and support for agriculture value chains.', read_more_link: 'https://www.agricoop.gov.in/' },
			{ scheme_name: 'Farmer Producer Organisations (FPO) Scheme', description: 'Promote FPOs with support and credit.', read_more_link: 'https://sfacindia.com/' },
			{ scheme_name: 'PM Matsya Sampada Yojana (PMMSY)', description: 'Fisheries development and welfare.', read_more_link: 'https://pmmsy.dof.gov.in/' }
		];
		try {
			for (const s of list) { await addScheme(s); }
			showSeedMessage('✅ Seeded 30 schemes', 'success');
			loadSchemes();
		} catch (e) {
			showSeedMessage('❌ Seeding failed', 'error');
		}
	});
});
