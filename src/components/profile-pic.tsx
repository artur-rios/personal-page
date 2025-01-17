import Image from 'next/image'
import profilePic from '../../public/profile.jpg';

export default function ProfilePic() {
    return (
        <>
            <div className="flex items-center justify-center h-fit">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                        src={profilePic}
                        alt="Profile Image"
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </>
    )
}