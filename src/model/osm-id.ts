export class OsmId {
  static node(id: string): OsmId {
    return new OsmId('node', id);
  }

  static way(id: string): OsmId {
    return new OsmId('way', id);
  }

  static relation(id: string): OsmId {
    return new OsmId('relation', id);
  }

  private constructor(public readonly type: string, public readonly id: string) {}
}
