export enum SlComponentType {
  IntegratedCircuit = 'INTEGRATED_CIRCUIT',
  LightBulb = 'LIGHT_BULB',
  BufferGate = 'BUFFER_GATE',
  NotGate = 'NOT_GATE',
  OrGate = 'OR_GATE',
  NorGate = 'NOR_GATE',
  AndGate = 'AND_GATE',
  NandGate = 'NAND_GATE',
  XorGate = 'XOR_GATE',
  XnorGate = 'XNOR_GATE',
  PulseButton = 'PULSE_BUTTON',
  ToggleButton = 'TOGGLE_BUTTON',
  DFlipFlop = 'D_FLIP_FLOP',
  HighConstant = 'HIGH_CONSTANT',
}

export interface SlComponent {
  ID: number;
  TAG: SlComponentType;
  X: number;
  Y: number;
  INPUTS: Input[];
  ARGUMENTS?: SlArguments;
}

export interface SlijFile {
  HEADER: Header;
  COMPONENTS: SlComponent[];
  DEPENDENCIES: Dependencies;
}

export interface SlArguments {
  ENABLED?: boolean;
  LABEL?: string;
  URI?: URI;
  NUM_OF_IN?: number;
  NUM_OF_OUT?: number;
  IN?: number;
}

export enum URI {
  The16Bit1HotDecoderSlij = '16-bit-1-hot-decoder.slij',
  The4Way8BitSourceSelectorSlij = '4-way-8-bit-source-selector.slij',
  The8BitRegisterSlij = '8-bit-register.slij',
}

export interface Input {
  CONNECTOR_ID: number;
  OTHER_COMPONENT: number;
  OTHER_CONNECTOR_ID: number;
}

export interface Dependencies {
  [key: string]: SlInternalComponentReference;
}

// this interface is for the inlined components that don't contain their own dependencies.
export interface SlInternalComponentReference {
  HEADER: Header;
  COMPONENTS: SlComponent[];
}

export interface Header {
  TAG: string;
  APP_VERSION: number;
}

export interface Point {
  x: number;
  y: number;
}
