import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ length: 5 })
  extension: string;

  @Column({ type: 'simple-json', nullable: true })
  position: { x: number; y: number; z: number };

  @Column({ type: 'double', default: 1 })
  scale: number;

  @Column({ default: false })
  hidden: boolean;
}
