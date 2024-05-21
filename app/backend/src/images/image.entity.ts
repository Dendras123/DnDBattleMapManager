import { Room } from 'src/rooms/room.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Room, (room) => room.images)
  room: Room;
}
