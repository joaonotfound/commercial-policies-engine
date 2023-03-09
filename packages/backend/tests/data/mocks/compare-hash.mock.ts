import { HashComparer } from '@/data'

export class MockHashComparer implements HashComparer {
  mockComparerHash(value: boolean) {
    jest.spyOn(this as HashComparer, 'compareHash').mockResolvedValueOnce(value)
  }

  // eslint-disable-next-line require-await
  async compareHash(_: string, _2: string): Promise<boolean> {
    return true
  }
}
