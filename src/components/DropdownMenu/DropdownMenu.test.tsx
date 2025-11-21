import { render, screen, fireEvent } from '@testing-library/react';

// Mock с алиасами
jest.mock('@/hooks/useDropdown', () => ({
  useDropdown: jest.fn()
}));

jest.mock('@/utils/position', () => ({
  getPositionStyles: jest.fn(() => ({}))
}));

jest.mock('./DropdownMenu.module.css', () => ({
  dropdown: 'dropdown',
  trigger: 'trigger',
  content: 'content',
  item: 'item',
  icon: 'icon',
  label: 'label',
}));

// Импортируем с алиасами
import DropdownMenu from './DropdownMenu';
import { useDropdown } from '@/hooks/useDropdown';

const mockUseDropdown = useDropdown as jest.MockedFunction<typeof useDropdown>;

interface MockItem {
  id: string;
  label: string;
  onClick: jest.Mock;
}

const createMockItems = (): MockItem[] => [
  {
    id: '1',
    label: 'Подсилился в социальных сетях',
    onClick: jest.fn(),
  },
  {
    id: '2',
    label: 'Редактировать страницу',
    onClick: jest.fn(),
  },
  {
    id: '3', 
    label: 'Удалить страницу',
    onClick: jest.fn(),
  },
];

describe('DropdownMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Обновленный mock с новой структурой
    mockUseDropdown.mockReturnValue({
      isOpen: false,
      position: 'bottom-right',
      triggerRef: { current: null },
      contentRef: { current: null },
      toggle: jest.fn(),
      close: jest.fn(),
      open: jest.fn(), // Добавлена функция open
    });
  });

  it('renders trigger correctly', () => {
    const mockItems = createMockItems();
    
    render(
      <DropdownMenu
        trigger={<button type="button">Open Menu</button>}
        items={mockItems}
      />
    );

    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('calls toggle when trigger is clicked', () => {
    const mockToggle = jest.fn();
    const mockItems = createMockItems();
    
    mockUseDropdown.mockReturnValue({
      isOpen: false,
      position: 'bottom-right',
      triggerRef: { current: null },
      contentRef: { current: null },
      toggle: mockToggle,
      close: jest.fn(),
      open: jest.fn(), // Добавлена функция open
    });

    render(
      <DropdownMenu
        trigger={<button type="button">Open Menu</button>}
        items={mockItems}
      />
    );

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('shows menu items when open', () => {
    const mockItems = createMockItems();
    
    mockUseDropdown.mockReturnValue({
      isOpen: true,
      position: 'bottom-right',
      triggerRef: { current: null },
      contentRef: { current: null },
      toggle: jest.fn(),
      close: jest.fn(),
      open: jest.fn(), // Добавлена функция open
    });

    render(
      <DropdownMenu
        trigger={<button type="button">Open Menu</button>}
        items={mockItems}
      />
    );

    expect(screen.getByText('Подсилился в социальных сетях')).toBeInTheDocument();
    expect(screen.getByText('Редактировать страницу')).toBeInTheDocument();
    expect(screen.getByText('Удалить страницу')).toBeInTheDocument();
  });

  it('calls item onClick and closes when item is clicked', () => {
    const mockClose = jest.fn();
    const mockItems = createMockItems();
    
    mockUseDropdown.mockReturnValue({
      isOpen: true,
      position: 'bottom-right',
      triggerRef: { current: null },
      contentRef: { current: null },
      toggle: jest.fn(),
      close: mockClose,
      open: jest.fn(), // Добавлена функция open
    });

    render(
      <DropdownMenu
        trigger={<button type="button">Open Menu</button>}
        items={mockItems}
      />
    );

    const menuItem = screen.getByText('Редактировать страницу');
    fireEvent.click(menuItem);

    expect(mockItems[1].onClick).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});