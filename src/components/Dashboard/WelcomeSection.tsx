import React from 'react';
import QuickActions from '../Common/QuickActions';
import ImportToursButton from '../Common/ImportToursButton';

export default function WelcomeSection() {
  return (
    <div className="space-y-6">
      <QuickActions />
      <ImportToursButton />
    </div>
  );
}