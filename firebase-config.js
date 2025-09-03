// Initialize Firebase (compat SDK)
// Load this after including firebase-app-compat, firebase-auth-compat, firebase-firestore-compat
(function() {
	if (!window.firebase || !window.firebase.initializeApp) {
		console.error('Firebase SDK not loaded. Include compat SDK scripts before firebase-config.js');
		return;
	}

	const firebaseConfig = {
		apiKey: "AIzaSyBPI263wEMC905oqQHzd_sNUnWJRiKj3EQ",
		authDomain: "asep-kissan-connect.firebaseapp.com",
		projectId: "asep-kissan-connect",
		storageBucket: "asep-kissan-connect.firebasestorage.app",
		messagingSenderId: "866086673466",
		appId: "1:866086673466:web:9155090b0a5cc91cef6903"
	};

	const app = firebase.initializeApp(firebaseConfig);
	const auth = firebase.auth();
	const db = firebase.firestore();

	// Firestore recommended settings
	// db.settings({ ignoreUndefinedProperties: true });

	window.firebaseApp = app;
	window.auth = auth;
	window.db = db;
})();
