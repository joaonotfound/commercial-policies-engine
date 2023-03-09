export interface Hasher {
  generateHash(value: string): Promise<string>
}
