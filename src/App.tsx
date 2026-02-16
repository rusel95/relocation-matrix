import React, { useEffect, useState } from 'react';
import { Matrix } from './components/Matrix/Matrix';
import { LoginModal } from './components/Auth/LoginModal';
import { Landing } from './pages/Landing';
import { useAuth } from './hooks/useAuth';

function App() {
  const auth = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <div className="w-full">
      {showMatrix ? (
        <>
          {/* Top Bar (Matrix View) */}
          <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMatrix(false)}
                  className="text-slate-600 hover:text-slate-900 font-semibold"
                >
                  ← Back
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <h1 className="text-xl font-bold text-slate-900">Relocation Matrix</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {auth.user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">{auth.email}</span>
                    <button
                      onClick={() => auth.signOut()}
                      className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="w-full">
            <Matrix userId={auth.user?.id || null} />
          </main>
        </>
      ) : (
        <Landing onGetStarted={() => setShowMatrix(true)} />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSignInWithGoogle={auth.signInWithGoogle}
        onSignInWithEmail={auth.signInWithEmail}
        onSignUp={auth.signUp}
        isLoading={auth.isLoading}
      />

      {/* Error Display */}
      {auth.error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-sm">
          <p className="text-sm font-semibold text-red-900">{auth.error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
