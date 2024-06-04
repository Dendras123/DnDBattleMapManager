import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Image } from 'src/images/image.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Unnamed Map' })
  name: string;

  @Column({ default: 1600 })
  width: number;

  @Column({ default: 900 })
  height: number;

  @OneToMany(() => Image, (image) => image.room)
  images: Image[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
