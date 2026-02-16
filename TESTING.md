# 🧪 Relocation Matrix — Testing Guide

## Local Testing

### 1. Setup
```bash
npm install
cp .env.example .env.local
# Edit .env.local with Supabase keys
npm start
```

### 2. Test Flows

#### Landing Page
- [ ] Landing page loads
- [ ] "Start Exploring" button navigates to Matrix
- [ ] Features section visible
- [ ] CTA buttons work

#### Sign In / Sign Up
- [ ] Sign up with email works
- [ ] Sign in with email works
- [ ] Google OAuth works (if configured)
- [ ] Error messages display correctly
- [ ] Auth persists on refresh

#### Matrix UI
- [ ] All 40 cities load
- [ ] Weights sliders work (super-weighted and standard)
- [ ] Scores update in real-time
- [ ] City ranking changes on weight adjustment
- [ ] Match percentage updates correctly

#### Comparison
- [ ] Can select/deselect cities
- [ ] Comparison view shows selected cities
- [ ] Side-by-side display is readable
- [ ] Unselect removes from comparison

#### Save Profile
- [ ] Save button appears when logged in
- [ ] Save modal opens/closes
- [ ] Can enter profile name
- [ ] Profile saves successfully
- [ ] Error shows if name is empty

#### My Profiles
- [ ] My Profiles button shows count
- [ ] Can view saved profiles
- [ ] Can load profile (weights + cities + salary)
- [ ] Can share profile (creates link)
- [ ] Can delete profile

#### Responsive Design
**Mobile (iPhone 12)**
- [ ] Landing page responsive
- [ ] Matrix header responsive
- [ ] Sidebar collapses on mobile
- [ ] Comparison grid stacks vertically
- [ ] Weight sliders touch-friendly
- [ ] No horizontal scroll

**Tablet (iPad)**
- [ ] 2-column layout works
- [ ] All elements visible
- [ ] No layout shifts

### 3. Performance
- [ ] Landing page loads < 2s
- [ ] Matrix loads < 1s (after landing)
- [ ] Weight change updates < 100ms
- [ ] No memory leaks (DevTools Profiler)

### 4. Accessibility
- [ ] Keyboard navigation works
- [ ] Color contrast passes WCAG AA
- [ ] Focus visible on all buttons
- [ ] Error messages are descriptive

---

## Browser Testing

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ |
| Firefox | Latest | ✅ |
| Safari | 14+ | ✅ |
| Edge | Latest | ✅ |
| Mobile Safari | iOS 12+ | ✅ |
| Chrome Mobile | Android 8+ | ✅ |

---

## Known Issues

None at launch. Report bugs: https://github.com/rusel95/relocation-matrix/issues

---

## Performance Targets

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | - |
| Largest Contentful Paint | < 2.5s | - |
| Interaction to Paint | < 100ms | - |
| Cumulative Layout Shift | < 0.1 | - |

---

## Load Testing

```bash
# Simulate 100 concurrent users
artillery load-test.yml
```

Expected: Server stable, < 2s response time

---

## Security Testing

- [ ] XSS prevention (sanitize inputs)
- [ ] CSRF protection (Supabase handles)
- [ ] SQL injection prevention (Supabase RLS)
- [ ] Data validation (frontend + backend)
- [ ] Auth state secure (JWT in localStorage)

---

## Before Launch Checklist

- [ ] All flows tested on mobile
- [ ] Auth tested (email + Google)
- [ ] Save/Load profiles work
- [ ] Share links work
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Accessibility checked
- [ ] Privacy policy reviewed
- [ ] Terms of Service reviewed
