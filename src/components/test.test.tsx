import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TourCard from './TourCard';

describe('TourCard component', () => {
    it('renders without crashing', () => {
        render(
            <TourCard
                title="Test Title"
                description="Test description"
                stops={["Stop 1", "Stop 2"]}
                estimatedTime="2 hours"
            />
        );

        expect(screen.getByText("Test Title")).toBeInTheDocument();
    });
});