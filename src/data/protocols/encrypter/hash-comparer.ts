export interface HashComparer {
  compareHash(plainText: string, digest: string): Promise<boolean>
}
