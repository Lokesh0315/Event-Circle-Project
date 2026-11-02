import React from 'react';
import EventCard from './EventCard';
import EmptyState from './EmptyState';

export const EventGrid = ({ events, emptyTitle = "No events found", emptyMessage = "Try tweaking your search terms or filters." }) => {
  if (!events || events.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} />
      ))}
    </div>
  );
};

export default EventGrid;
